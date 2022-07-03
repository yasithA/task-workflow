/**
 * Represents a Domain Event for a given Event Type.
 */
interface DomainEvent<S> {
    eventId: number;
    event: S;
    timestamp: number;
    // TODO: Map payload to event
    payload?: unknown;
}

/**
 * The Event Log for a given Domain Aggregate.
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
 * for any given domain aggregate for a given Event Type.
 *
 */
export class EventStore<S> {
    private entities: Record<string, EventLog<S>> | undefined;
    private subscriptions;
    constructor() {
        this.entities = undefined;
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
    private addNewEntityToStore(
        entityId: string,
        event: S,
        payload?: Record<string, unknown>
    ) {
        const eventLog = new EventLog<S>();
        eventLog.events.push({
            event,
            eventId: ++eventLog.currentEvent,
            timestamp: Date.now(),
            payload,
        });

        this.entities = {
            [entityId]: eventLog,
        };
    }

    /**
     * Append a domain event to the event log of the domain aggregate's event store.
     *
     * @param entityId Entity ID
     * @param event Event
     * @param payload Payload related to event. (optional)
     */
    appendEvent(entityId: string, event: S, payload?: Record<string, unknown>) {
        if (this.entities === undefined) {
            this.addNewEntityToStore(entityId, event, payload);
        } else {
            const storedEntity = this.entities[entityId];
            if (storedEntity === undefined) {
                this.addNewEntityToStore(entityId, event, payload);
            } else {
                storedEntity.events.push({
                    event,
                    eventId: ++storedEntity.currentEvent,
                    timestamp: Date.now(),
                    payload,
                });
            }
        }
        for (const subscription of this.subscriptions) {
            subscription(entityId, event, payload);
        }
    }

    /**
     * Retrieve all events for a Given domain instance.
     *
     * @param entityId Unique identifier of the domain instance.
     * @returns an array of DomainEvents
     */
    getAllEventsByEntityId(entityId: string) {
        if (this.entities == undefined) {
            throw new Error('No entities exists yet.');
        }
        const storedEvent = this.entities[entityId];
        if (storedEvent === undefined) {
            throw new Error(`No entity found for id [${entityId}].`);
        }
        return storedEvent.events;
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
