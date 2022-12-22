import { Prisma } from '../../prisma/generated/prisma/client';
import { EventEntityRepository, EventEntityType } from './event-entity-type';

/**
 * Represents a Domain Event for a given Event Type.
 */
export interface DomainEvent<S> {
    eventId: number;
    event: S;
    timestamp: number;
    payload: unknown;
}

/**
 * The Event Log for a given Domain Entity.
 * This contains a list of Domain Events.
 *
 */
class EventLog<S> {
    events: DomainEvent<S>[];
    currentEvent: number;
    constructor() {
        this.events = [];
        this.currentEvent = 0;
    }
}

/**
 * EventStore creates a container to store events
 * for any given domain entity for a given Event Type.
 *
 * `S` is the Event Type.
 * `E` is the Domain Entity Type which conforms with `EventEntityType` interface.
 * `T` is the Domain Entity Repository which conforms `EventEntityRepository` interface.
 */
export class EventStore<
    S,
    E extends EventEntityType,
    T extends EventEntityRepository<E, S>
> {
    private subscriptions;
    private eventEntityRepository: T;

    constructor(eventEntityRepository: T) {
        this.eventEntityRepository = eventEntityRepository;
        this.subscriptions = new Array<
            (
                entityId: string,
                event: S,
                payload?: Record<string, unknown>
            ) => void
        >();
    }

    /**
     * Add a new domain instance to the event store entities.
     *
     * @param entityId
     * @param event
     * @param payload
     */
    private async addNewEntityToStore(
        entityId: string,
        event: S,
        payload: Record<string, unknown>
    ) {
        const eventLog = new EventLog<S>();
        eventLog.events.push({
            event,
            eventId: ++eventLog.currentEvent,
            timestamp: Date.now(),
            payload,
        });

        await this.eventEntityRepository.create(
            entityId,
            eventLog.events as unknown as Prisma.JsonValue[]
        );
    }

    /**
     * Append a domain event to the event log of the domain entity's event store.
     *
     * @param entityId Entity ID
     * @param event Event
     * @param payload Payload related to event.
     */
    async appendEvent(
        entityId: string,
        event: S,
        payload: Record<string, unknown>
    ) {
        const storedEntity = await this.eventEntityRepository.get(entityId);
        if (storedEntity === null) {
            await this.addNewEntityToStore(entityId, event, payload);
        } else {
            const currentPayload = storedEntity.eventLog;
            currentPayload.push({
                event,
                eventId: ++storedEntity.currentEvent,
                timestamp: Date.now(),
                payload,
            } as Prisma.JsonValue);

            await this.eventEntityRepository.appendEvent(
                entityId,
                currentPayload,
                storedEntity.currentEvent
            );
        }

        for (const subscription of this.subscriptions) {
            subscription(entityId, event, payload);
        }
    }

    /**
     * Retrieve all events for a Given domain instance.
     *
     * @param entityId Unique identifier of the domain instance.
     * @returns an array of DomainEvents for the given entity.
     */
    async getAllEventsByEntityId(entityId: string) {
        const storedEntity = await this.eventEntityRepository.get(entityId);
        if (storedEntity === null) {
            throw new Error(`No entity found for id [${entityId}].`);
        }
        return storedEntity.eventLog;
    }

    /**
     * Retrieve all entities in the event store.
     *
     * @returns an array of Domain Entities.
     */
    async getAllEntities() {
        return this.eventEntityRepository.getAll();
    }

    /**
     * Susbcribe to domain events of the event store.
     * Any interested party can subscribe to the event store and register
     * a callback that will be called whenver a new domain event occurs.
     *
     * @param subscription Callback function
     */
    subscribe(
        subscription: (
            entityId: string,
            event: S,
            payload?: Record<string, unknown>
        ) => void
    ) {
        this.subscriptions.push(subscription);
    }
}
