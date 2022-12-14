import { EventStore } from '../../event-store';
import {
    createTask,
    moveToAbandoned,
    moveToCompleted,
    moveToInProgress,
    moveToPaused,
} from './task-command-utils';
import { TaskEvents } from './task-events';
import { TaskState } from '@prisma/client';

describe('test-command-utils', () => {
    let taskEventStore: EventStore<TaskEvents>;

    beforeAll(() => {
        taskEventStore = new EventStore<TaskEvents>();
    });

    describe('createTask', () => {
        it('When createTask is called, a new Task instance is created in the event store and the instance is returned', () => {
            // Act
            const taskA = createTask(taskEventStore, 'Cook Dinner', 'Pasta');

            // Assert
            const allEvents = taskEventStore.getAllEventsByEntityId(taskA.id);

            expect(taskA.state).toEqual(TaskState.Planned);
            expect(taskA.id).toBeTruthy();
            expect(allEvents[0]).toMatchObject({
                event: 'Create',
                eventId: 1,
                payload: {
                    ...taskA,
                },
            });
        });
    });

    describe('moveToInProgress', () => {
        it.each([
            [TaskState.Planned, TaskEvents.Create],
            [TaskState.Paused, TaskEvents.MoveToPaused],
        ])(
            'When moveToInProgress is called with state as %s, relevant event is appended to the event store and returns the tasl with the  state of the task is set to InProgress',
            async (taskState, taskEvent) => {
                // Arrange
                const taskA = createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act
                const updatedTask = moveToInProgress(taskEventStore, taskA.id);

                // Assert
                expect(updatedTask).toEqual({
                    ...taskA,
                    state: TaskState.InProgress,
                });
            }
        );

        it.each([
            [TaskState.Abandoned, TaskEvents.Abandon],
            [TaskState.Completed, TaskEvents.MoveToCompleted],
            [TaskState.InProgress, TaskEvents.MoveToInProgress],
        ])(
            'When moveToInProgress is called with task state %s, a state change error is raised',
            (taskState, taskEvent) => {
                // Arrange
                const taskA = createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act and Assert
                expect(() =>
                    moveToInProgress(taskEventStore, taskA.id)
                ).toThrow(
                    `State transition from [${taskState}] to [InProgress] is not allowed.`
                );
            }
        );
    });

    describe('moveToCompleted', () => {
        it.each([[TaskState.InProgress, TaskEvents.MoveToInProgress]])(
            'When moveToCompleted is called with state as %s, relevant event is appended to the event store and returns the tasl with the  state of the task is set to Completed',
            (taskState, taskEvent) => {
                // Arrange
                const taskA = createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act
                const updatedTask = moveToCompleted(taskEventStore, taskA.id);

                // Assert
                expect(updatedTask).toEqual({
                    ...taskA,
                    state: TaskState.Completed,
                });
            }
        );

        it.each([
            [TaskState.Planned, TaskEvents.Create],
            [TaskState.Paused, TaskEvents.MoveToPaused],
            [TaskState.Abandoned, TaskEvents.Abandon],
            [TaskState.Completed, TaskEvents.MoveToCompleted],
        ])(
            'When moveToCompleted is called with task state %s, a state change error is raised',
            (taskState, taskEvent) => {
                // Arrange
                const taskA = createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act and Assert
                expect(() => moveToCompleted(taskEventStore, taskA.id)).toThrow(
                    `State transition from [${taskState}] to [Completed] is not allowed.`
                );
            }
        );
    });

    describe('moveToAbandoned', () => {
        it.each([
            [TaskState.Planned, TaskEvents.Create],
            [TaskState.InProgress, TaskEvents.MoveToInProgress],
            [TaskState.Paused, TaskEvents.MoveToPaused],
        ])(
            'When moveToAbandoned is called with state as %s, relevant event is appended to the event store and returns the tasl with the  state of the task is set to Abandoned',
            (taskState, taskEvent) => {
                // Arrange
                const taskA = createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act
                const updatedTask = moveToAbandoned(taskEventStore, taskA.id);

                // Assert
                expect(updatedTask).toEqual({
                    ...taskA,
                    state: TaskState.Abandoned,
                });
            }
        );

        it.each([
            [TaskState.Abandoned, TaskEvents.Abandon],
            [TaskState.Completed, TaskEvents.MoveToCompleted],
        ])(
            'When moveToAbandoned is called with task state %s, a state change error is raised',
            (taskState, taskEvent) => {
                // Arrange
                const taskA = createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act and Assert
                expect(() => moveToAbandoned(taskEventStore, taskA.id)).toThrow(
                    `State transition from [${taskState}] to [Abandoned] is not allowed.`
                );
            }
        );
    });

    describe('moveToPaused', () => {
        it.each([[TaskState.InProgress, TaskEvents.MoveToInProgress]])(
            'When moveToPaused is called with state as %s, relevant event is appended to the event store and returns the tasl with the  state of the task is set to Paused',
            (taskState, taskEvent) => {
                // Arrange
                const taskA = createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act
                const updatedTask = moveToPaused(taskEventStore, taskA.id);

                // Assert
                expect(updatedTask).toEqual({
                    ...taskA,
                    state: TaskState.Paused,
                });
            }
        );

        it.each([
            [TaskState.Planned, TaskEvents.Create],
            [TaskState.Abandoned, TaskEvents.Abandon],
            [TaskState.Completed, TaskEvents.MoveToCompleted],
            [TaskState.Paused, TaskEvents.MoveToPaused],
        ])(
            'When moveToPaused is called with task state %s, a state change error is raised',
            (taskState, taskEvent) => {
                // Arrange
                const taskA = createTask(
                    taskEventStore,
                    'Cook Dinner',
                    'Pasta'
                );
                taskEventStore.appendEvent(taskA.id, taskEvent, {
                    state: taskState,
                });

                // Act and Assert
                expect(() => moveToPaused(taskEventStore, taskA.id)).toThrow(
                    `State transition from [${taskState}] to [Paused] is not allowed.`
                );
            }
        );
    });
});
