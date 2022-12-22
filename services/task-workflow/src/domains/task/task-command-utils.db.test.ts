import { EventStore } from '../../event-store';
import {
    createTask,
    moveToAbandoned,
    moveToCompleted,
    moveToInProgress,
    moveToPaused,
} from './task-command-utils';
import { TaskEvent, TaskState } from './task';
import {
    PrismaClient,
    TaskEvents,
} from '../../../prisma/generated/prisma/client';
import { getPrismaClient } from '../../test-utils/test-utils';
import path from 'path';
import { TaskEventRepository } from './task-event-respository';

describe('test-command-utils', () => {
    let taskEventRepository: TaskEventRepository;
    let taskEventStore: EventStore<TaskEvent, TaskEvents, TaskEventRepository>;

    let prismaClient: PrismaClient;

    beforeAll(async () => {
        prismaClient = getPrismaClient(
            path.basename(__filename).replace('-', '_')
        );
        taskEventRepository = new TaskEventRepository(prismaClient);
        taskEventStore = new EventStore<
            TaskEvent,
            TaskEvents,
            TaskEventRepository
        >(taskEventRepository);
    });

    afterEach(async () => {
        await prismaClient.taskEvents.deleteMany();
    });

    describe('createTask', () => {
        it('When createTask is called, a new Task instance is created in the event store and the instance is returned', async () => {
            // Act
            const taskA = await createTask(
                taskEventStore,
                'Cook Dinner',
                'Pasta'
            );

            // Assert
            const allEvents = await taskEventStore.getAllEventsByEntityId(
                taskA.id
            );

            expect(taskA.state).toEqual(TaskState.Planned);
            expect(taskA.id).toBeTruthy();
            expect(allEvents[0]).toMatchObject(
                expect.objectContaining({
                    event: 'Create',
                    eventId: 1,
                    payload: {
                        ...taskA,
                    },
                })
            );
        });
    });

    describe('moveToInProgress', () => {
        it.each([
            [TaskState.Planned, TaskEvent.Create],
            [TaskState.Paused, TaskEvent.MoveToPaused],
        ])(
            'When moveToInProgress is called with state as %s, relevant event is appended to the event store and returns the tasl with the  state of the task is set to InProgress',
            async (taskState, taskEvent) => {
                // Arrange
                const taskA = await createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act
                const updatedTask = await moveToInProgress(
                    taskEventStore,
                    taskA.id
                );

                // Assert
                expect(updatedTask).toEqual({
                    ...taskA,
                    state: TaskState.InProgress,
                });
            }
        );

        it.each([
            [TaskState.Abandoned, TaskEvent.Abandon],
            [TaskState.Completed, TaskEvent.MoveToCompleted],
            [TaskState.InProgress, TaskEvent.MoveToInProgress],
        ])(
            'When moveToInProgress is called with task state %s, a state change error is raised',
            async (taskState, taskEvent) => {
                // Arrange
                const taskA = await createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                await taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act and Assert
                await expect(
                    moveToInProgress(taskEventStore, taskA.id)
                ).rejects.toThrow(
                    `State transition from [${taskState}] to [InProgress] is not allowed.`
                );
            }
        );
    });

    describe('moveToCompleted', () => {
        it.each([[TaskState.InProgress, TaskEvent.MoveToInProgress]])(
            'When moveToCompleted is called with state as %s, relevant event is appended to the event store and returns the tasl with the  state of the task is set to Completed',
            async (taskState, taskEvent) => {
                // Arrange
                const taskA = await createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                await taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act
                const updatedTask = await moveToCompleted(
                    taskEventStore,
                    taskA.id
                );

                // Assert
                expect(updatedTask).toEqual({
                    ...taskA,
                    state: TaskState.Completed,
                });
            }
        );

        it.each([
            [TaskState.Planned, TaskEvent.Create],
            [TaskState.Paused, TaskEvent.MoveToPaused],
            [TaskState.Abandoned, TaskEvent.Abandon],
            [TaskState.Completed, TaskEvent.MoveToCompleted],
        ])(
            'When moveToCompleted is called with task state %s, a state change error is raised',
            async (taskState, taskEvent) => {
                // Arrange
                const taskA = await createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                await taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act and Assert
                await expect(
                    moveToCompleted(taskEventStore, taskA.id)
                ).rejects.toThrow(
                    `State transition from [${taskState}] to [Completed] is not allowed.`
                );
            }
        );
    });

    describe('moveToAbandoned', () => {
        it.each([
            [TaskState.Planned, TaskEvent.Create],
            [TaskState.InProgress, TaskEvent.MoveToInProgress],
            [TaskState.Paused, TaskEvent.MoveToPaused],
        ])(
            'When moveToAbandoned is called with state as %s, relevant event is appended to the event store and returns the tasl with the  state of the task is set to Abandoned',
            async (taskState, taskEvent) => {
                // Arrange
                const taskA = await createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                await taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act
                const updatedTask = await moveToAbandoned(
                    taskEventStore,
                    taskA.id
                );

                // Assert
                expect(updatedTask).toEqual({
                    ...taskA,
                    state: TaskState.Abandoned,
                });
            }
        );

        it.each([
            [TaskState.Abandoned, TaskEvent.Abandon],
            [TaskState.Completed, TaskEvent.MoveToCompleted],
        ])(
            'When moveToAbandoned is called with task state %s, a state change error is raised',
            async (taskState, taskEvent) => {
                // Arrange
                const taskA = await createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                await taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act and Assert
                await expect(
                    moveToAbandoned(taskEventStore, taskA.id)
                ).rejects.toThrow(
                    `State transition from [${taskState}] to [Abandoned] is not allowed.`
                );
            }
        );
    });

    describe('moveToPaused', () => {
        it.each([[TaskState.InProgress, TaskEvent.MoveToInProgress]])(
            'When moveToPaused is called with state as %s, relevant event is appended to the event store and returns the tasl with the  state of the task is set to Paused',
            async (taskState, taskEvent) => {
                // Arrange
                const taskA = await createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                await taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act
                const updatedTask = await moveToPaused(
                    taskEventStore,
                    taskA.id
                );

                // Assert
                expect(updatedTask).toEqual({
                    ...taskA,
                    state: TaskState.Paused,
                });
            }
        );

        it.each([
            [TaskState.Planned, TaskEvent.Create],
            [TaskState.Abandoned, TaskEvent.Abandon],
            [TaskState.Completed, TaskEvent.MoveToCompleted],
            [TaskState.Paused, TaskEvent.MoveToPaused],
        ])(
            'When moveToPaused is called with task state %s, a state change error is raised',
            async (taskState, taskEvent) => {
                // Arrange
                const taskA = await createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                await taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act and Assert
                await expect(
                    moveToPaused(taskEventStore, taskA.id)
                ).rejects.toThrow(
                    `State transition from [${taskState}] to [Paused] is not allowed.`
                );
            }
        );
    });
});
