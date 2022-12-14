import { TaskEvents } from './task-events';
import { Task, TaskState } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import { EventStore } from '../../event-store';
import { getTaskByTaskId } from './task-query-utils';
import { validateStateTransition } from './state-machine';

/**
 * Create a new Task instance and add it to the event store.
 *
 * @param eventStore
 * @param name
 * @param description
 * @returns
 */
export const createTask = (
    eventStore: EventStore<TaskEvents>,
    name: string,
    description: string
): Task => {
    const task: Task = {
        name,
        description,
        id: uuid(),
        state: TaskState.Planned,
        comment: null,
    };

    eventStore.appendEvent(task.id, TaskEvents.Create, { ...task });
    return task;
};

/**
 * Initiate state transition of a Task instance to `InProgress`.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export const moveToInProgress = (
    eventStore: EventStore<TaskEvents>,
    taskId: string
): Task => {
    const task = getTaskByTaskId(eventStore, taskId);
    validateStateTransition(task.state, TaskState.InProgress);
    eventStore.appendEvent(taskId, TaskEvents.MoveToInProgress, {
        state: TaskState.InProgress,
    });
    return {
        ...task,
        state: TaskState.InProgress,
    };
};

/**
 * Initiate state transition of a Task instance to `Completed`.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export const moveToCompleted = (
    eventStore: EventStore<TaskEvents>,
    taskId: string
): Task => {
    const task = getTaskByTaskId(eventStore, taskId);
    validateStateTransition(task.state, TaskState.Completed);
    eventStore.appendEvent(taskId, TaskEvents.MoveToCompleted, {
        state: TaskState.Completed,
    });
    return {
        ...task,
        state: TaskState.Completed,
    };
};

/**
 * Initiate state transition of a Task instance to `Abandoned`.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export const moveToAbandoned = (
    eventStore: EventStore<TaskEvents>,
    taskId: string
): Task => {
    const task = getTaskByTaskId(eventStore, taskId);
    validateStateTransition(task.state, TaskState.Abandoned);
    eventStore.appendEvent(taskId, TaskEvents.Abandon, {
        state: TaskState.Abandoned,
    });
    return {
        ...task,
        state: TaskState.Abandoned,
    };
};

/**
 * Initiate state transition of a Task instance to Paused.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export const moveToPaused = (
    eventStore: EventStore<TaskEvents>,
    taskId: string
): Task => {
    const task = getTaskByTaskId(eventStore, taskId);
    validateStateTransition(task.state, TaskState.Paused);
    eventStore.appendEvent(taskId, TaskEvents.MoveToPaused, {
        state: TaskState.Paused,
    });
    return {
        ...task,
        state: TaskState.Paused,
    };
};
