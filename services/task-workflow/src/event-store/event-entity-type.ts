import { Prisma } from '../../prisma/generated/prisma/client';

/**
 * The structure of a domain entity which is compatible with the EventStore.
 * All domain entities which require to use EventStore must align with this structure.
 */
export interface EventEntityType {
    id: string;
    //TODO: Ideally the type should be `DomainEvent<S>[]`. But Prisma Client does not support specifying stricter types for JSON fields.
    // Look into a way of handling this while using `DomainEvent<S>[]` as the type.
    eventLog: Prisma.JsonValue[];
    currentEvent: number;
}

/**
 * The shape of a domain entity repository which is compatible with the EventStore.
 * All domain entities which require to use EventStore must implement this interface.
 */
export interface EventEntityRepository<T, S> {
    create(entityId: string, eventLog: Prisma.JsonValue[]): Promise<T>;
    get(entityId: string): Promise<T | null>;
    getAll(): Promise<T[]>;
    appendEvent(
        entityId: string,
        updatedEventLog: Prisma.JsonValue[],
        currentEventSeq: number
    ): Promise<T>;
}
