import { EventStore } from '../../event-store';
import { TaskEvents, TaskState } from './task';
import { v4 as uuid } from 'uuid';
import { getTaskByTaskId, getTaskStateByTaskId } from './task-query-utils';

describe('task-query-utils', () => {
    describe('getTaskByTaskId', () => {
        it('When multiple state changes are done through multiple events, the final state is always returned', () => {
            // Arrange
            const id = uuid();
            const taskEventStore = new EventStore<TaskEvents>();
            taskEventStore.appendEvent(id, TaskEvents.Create, {
                name: 'Cook',
                description: 'Make Pasta',
                id,
                state: TaskState.Planned,
                comment: 'Starting comment',
            });
            taskEventStore.appendEvent(id, TaskEvents.MoveToInProgress, {
                state: TaskState.InProgress,
                comment: 'Starting cooking',
            });
            taskEventStore.appendEvent(id, TaskEvents.MoveToPaused, {
                state: TaskState.Paused,
                comment: 'Pausing to answer a call',
            });

            // Act
            const task = getTaskByTaskId(taskEventStore, id);

            // Assert
            expect(task).toMatchObject({
                name: 'Cook',
                description: 'Make Pasta',
                id,
                state: TaskState.Paused,
                comment: 'Pausing to answer a call',
            });
        });

        it('When multiple state changes are done through multiple events, and not all properties are changed in the final event, the last known change for all properties are returned', () => {
            // Arrange
            const id = uuid();
            const taskEventStore = new EventStore<TaskEvents>();
            taskEventStore.appendEvent(id, TaskEvents.Create, {
                name: 'Cook',
                description: 'Make Pasta',
                id,
                state: TaskState.Planned,
                comment: 'Starting comment',
            });
            taskEventStore.appendEvent(id, TaskEvents.MoveToInProgress, {
                state: TaskState.InProgress,
                comment: 'Starting cooking',
            });
            taskEventStore.appendEvent(id, TaskEvents.MoveToPaused, {
                state: TaskState.Paused,
                comment: 'Pausing to answer a call',
            });
            taskEventStore.appendEvent(id, TaskEvents.MoveToCompleted, {
                state: TaskState.Completed,
            });

            // Act
            const task = getTaskByTaskId(taskEventStore, id);

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
            const id = uuid();
            const taskEventStore = new EventStore<TaskEvents>();
            taskEventStore.appendEvent(id, TaskEvents.Create, {
                name: 'Cook',
                description: 'Make Pasta',
                id,
                state: TaskState.Planned,
                comment: 'Starting comment',
            });
            taskEventStore.appendEvent(id, TaskEvents.MoveToInProgress, {
                state: TaskState.InProgress,
                comment: 'Starting cooking',
            });
            taskEventStore.appendEvent(id, TaskEvents.MoveToPaused, {
                state: TaskState.Paused,
                comment: 'Pausing to answer a call',
            });

            // Act
            const taskState = getTaskStateByTaskId(taskEventStore, id);

            // Assert
            expect(taskState).toBe(TaskState.Paused);
        });
    });
});
