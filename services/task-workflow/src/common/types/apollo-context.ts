import {
    PrismaClient,
    TaskEvents,
} from '../../../prisma/generated/prisma/client';
import { TaskEvent } from '../../domains/task';
import { TaskEventRepository } from '../../domains/task/task-event-respository';
import { EventStore } from '../../event-store';

/**
 * GraphQL Context object to store extended properties
 * that can be accessed in resolvers.
 */
export interface ExtendedGraphQLContext {
    prismaClient: PrismaClient;
    taskEventStore: EventStore<TaskEvent, TaskEvents, TaskEventRepository>;
}
