import {
    PrismaClient,
    TaskEvents,
    Prisma,
} from '../../../prisma/generated/prisma/client';
import { EventEntityRepository } from '../../event-store/event-entity-type';
import { TaskEvent } from './task';

/**
 * Repository task for handling Task related database operations.
 */
export class TaskEventRepository
    implements EventEntityRepository<TaskEvents, TaskEvent>
{
    private prismaClient: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient;
    }

    /**
     * Create a new TaskEvent record.
     *
     * @param entityId
     * @param event
     * @param payload
     * @returns
     */
    async create(
        entityId: string,
        eventLog: Prisma.JsonValue[]
    ): Promise<TaskEvents> {
        return this.prismaClient.taskEvents.create({
            data: {
                id: entityId,
                eventLog: eventLog,
                currentEvent: 1,
            },
        });
    }

    /**
     * Retrieve a TaskEvent by ID.
     */
    async get(entityId: string): Promise<TaskEvents | null> {
        const entity = await this.prismaClient.taskEvents.findUnique({
            where: {
                id: entityId,
            },
        });
        return entity;
    }

    async getAll(): Promise<TaskEvents[]> {
        return this.prismaClient.taskEvents.findMany();
    }

    /**
     * Append an event to an existing TaskEvent record.
     *
     * @param entityId
     * @param updatedEventLog
     * @param currentEventSeq
     * @returns
     */
    async appendEvent(
        entityId: string,
        updatedEventLog: Prisma.JsonValue[],
        currentEventSeq: number
    ): Promise<TaskEvents> {
        return this.prismaClient.taskEvents.update({
            data: {
                eventLog: updatedEventLog as unknown as Prisma.JsonArray,
                currentEvent: currentEventSeq,
            },
            where: {
                id: entityId,
            },
        });
    }
}
