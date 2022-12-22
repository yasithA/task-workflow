import { EventStore } from '../../event-store';
import { TaskEvent, TaskState } from './task';
import { v4 as uuid } from 'uuid';
import {
    getTaskByTaskId,
    getTasks,
    getTaskStateByTaskId,
} from './task-query-utils';
import {
    PrismaClient,
    TaskEvents,
} from '../../../prisma/generated/prisma/client';
import { TaskEventRepository } from './task-event-respository';
import { getPrismaClient } from '../../test-utils';
import path from 'path';

describe('task-query-utils', () => {
    let prismaClient: PrismaClient;

    beforeAll(async () => {
        prismaClient = getPrismaClient(
            path.basename(__filename).replace('-', '_')
        );
    });

    afterEach(async () => {
        await prismaClient.taskEvents.deleteMany();
    });

    describe('getTaskByTaskId', () => {
        it('When multiple state changes are done through multiple events, the final state is always returned', async () => {
            // Arrange
            const taskEventRepository = new TaskEventRepository(prismaClient);
            const taskEventStore = new EventStore<
                TaskEvent,
                TaskEvents,
                TaskEventRepository
            >(taskEventRepository);

            const id = uuid();
            await taskEventStore.appendEvent(id, TaskEvent.Create, {
                name: 'Cook',
                description: 'Make Pasta',
                id,
                state: TaskState.Planned,
                comment: 'Starting comment',
            });
            await taskEventStore.appendEvent(id, TaskEvent.MoveToInProgress, {
                state: TaskState.InProgress,
                comment: 'Starting cooking',
            });
            await taskEventStore.appendEvent(id, TaskEvent.MoveToPaused, {
                state: TaskState.Paused,
                comment: 'Pausing to answer a call',
            });

            // Act
            const task = await getTaskByTaskId(taskEventStore, id);

            // Assert
            expect(task).toMatchObject({
                name: 'Cook',
                description: 'Make Pasta',
                id,
                state: TaskState.Paused,
                comment: 'Pausing to answer a call',
            });
        });

        it('When multiple state changes are done through multiple events, and not all properties are changed in the final event, the last known change for all properties are returned', async () => {
            // Arrange
            const id = uuid();
            const taskEventRepository = new TaskEventRepository(prismaClient);
            const taskEventStore = new EventStore<
                TaskEvent,
                TaskEvents,
                TaskEventRepository
            >(taskEventRepository);

            await taskEventStore.appendEvent(id, TaskEvent.Create, {
                name: 'Cook',
                description: 'Make Pasta',
                id,
                state: TaskState.Planned,
                comment: 'Starting comment',
            });
            await taskEventStore.appendEvent(id, TaskEvent.MoveToInProgress, {
                state: TaskState.InProgress,
                comment: 'Starting cooking',
            });
            await taskEventStore.appendEvent(id, TaskEvent.MoveToPaused, {
                state: TaskState.Paused,
                comment: 'Pausing to answer a call',
            });
            await taskEventStore.appendEvent(id, TaskEvent.MoveToCompleted, {
                state: TaskState.Completed,
            });

            // Act
            const task = await getTaskByTaskId(taskEventStore, id);

            // Assert
            expect(task).toMatchObject({
                name: 'Cook',
                description: 'Make Pasta',
                id,
                state: TaskState.Completed,
                comment: 'Pausing to answer a call', // the comment wasn't modified in the last event, so the last known property is returned
            });
        });
    });

    describe('getTaskStateByTaskId', () => {
        it('When multiple state changes are done to a task, the final task state is returned for a given id', async () => {
            // Arrange

            const taskEventRepository = new TaskEventRepository(prismaClient);
            const taskEventStore = new EventStore<
                TaskEvent,
                TaskEvents,
                TaskEventRepository
            >(taskEventRepository);

            const id = uuid();
            await taskEventStore.appendEvent(id, TaskEvent.Create, {
                name: 'Cook',
                description: 'Make Pasta',
                id,
                state: TaskState.Planned,
                comment: 'Starting comment',
            });
            await taskEventStore.appendEvent(id, TaskEvent.MoveToInProgress, {
                state: TaskState.InProgress,
                comment: 'Starting cooking',
            });
            await taskEventStore.appendEvent(id, TaskEvent.MoveToPaused, {
                state: TaskState.Paused,
                comment: 'Pausing to answer a call',
            });

            // Act
            const taskState = await getTaskStateByTaskId(taskEventStore, id);

            // Assert
            expect(taskState).toBe(TaskState.Paused);
        });
    });

    describe('getTasks', () => {
        it('When multiple tasks exists in the TaskEvents table, all tasks are returned with their respective event logs', async () => {
            // Arrange
            const taskEventRepository = new TaskEventRepository(prismaClient);
            const taskEventStore = new EventStore<
                TaskEvent,
                TaskEvents,
                TaskEventRepository
            >(taskEventRepository);

            const task1Id = uuid();
            await taskEventStore.appendEvent(task1Id, TaskEvent.Create, {
                name: 'Cook',
                description: 'Make Pasta',
                id: task1Id,
                state: TaskState.Planned,
                comment: 'Starting comment',
            });
            await taskEventStore.appendEvent(
                task1Id,
                TaskEvent.MoveToInProgress,
                {
                    state: TaskState.InProgress,
                    comment: 'Starting cooking',
                }
            );
            await taskEventStore.appendEvent(task1Id, TaskEvent.MoveToPaused, {
                state: TaskState.Paused,
                comment: 'Pausing to answer a call',
            });

            const task2Id = uuid();
            await taskEventStore.appendEvent(task2Id, TaskEvent.Create, {
                name: 'Eat',
                description: 'Eat Pasta',
                id: task2Id,
                state: TaskState.Planned,
                comment: 'Starting comment',
            });
            await taskEventStore.appendEvent(
                task2Id,
                TaskEvent.MoveToInProgress,
                {
                    state: TaskState.InProgress,
                    comment: 'Starting Dinner',
                }
            );
            await taskEventStore.appendEvent(task2Id, TaskEvent.MoveToPaused, {
                state: TaskState.Completed,
                comment: 'Finished eating dinner',
            });

            // Act
            const tasks = await getTasks(taskEventStore);

            // Assert
            expect(tasks).toMatchObject(
                expect.arrayContaining([
                    {
                        name: 'Cook',
                        description: 'Make Pasta',
                        id: task1Id,
                        state: TaskState.Paused,
                        comment: 'Pausing to answer a call',
                    },
                    {
                        name: 'Eat',
                        description: 'Eat Pasta',
                        id: task2Id,
                        state: TaskState.Completed,
                        comment: 'Finished eating dinner',
                    },
                ])
            );
        });
    });
});
