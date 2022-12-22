import { TaskEvent, Task, TaskState } from './task';
import { v4 as uuid } from 'uuid';
import { EventStore } from '../../event-store';
import { getTaskByTaskId } from './task-query-utils';
import { validateStateTransition } from './state-machine';
import { TaskEvents } from '../../../prisma/generated/prisma/client';
import { TaskEventRepository } from './task-event-respository';

/**
 * Create a new Task instance and add it to the event store.
 *
 * @param eventStore
 * @param name
 * @param description
 * @returns
 */
export const createTask = async (
    eventStore: EventStore<TaskEvent, TaskEvents, TaskEventRepository>,
    name: string,
    description: string,
    comment?: string
): Promise<Task> => {
    const task: Task = {
        name,
        description,
        id: uuid(),
        state: TaskState.Planned,
        comment,
    };

    await eventStore.appendEvent(task.id, TaskEvent.Create, { ...task });
    return task;
};

/**
 * Initiate state transition of a Task instance to `InProgress`.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export const moveToInProgress = async (
    eventStore: EventStore<TaskEvent, TaskEvents, TaskEventRepository>,
    taskId: string,
    comment?: string
): Promise<Task> => {
    const task = await getTaskByTaskId(eventStore, taskId);
    validateStateTransition(task.state, TaskState.InProgress);
    await eventStore.appendEvent(taskId, TaskEvent.MoveToInProgress, {
        state: TaskState.InProgress,
        comment,
    });
    return {
        ...task,
        state: TaskState.InProgress,
        comment,
    };
};

/**
 * Initiate state transition of a Task instance to `Completed`.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export const moveToCompleted = async (
    eventStore: EventStore<TaskEvent, TaskEvents, TaskEventRepository>,
    taskId: string,
    comment?: string
): Promise<Task> => {
    const task = await getTaskByTaskId(eventStore, taskId);
    validateStateTransition(task.state, TaskState.Completed);
    await eventStore.appendEvent(taskId, TaskEvent.MoveToCompleted, {
        state: TaskState.Completed,
        comment,
    });
    return {
        ...task,
        state: TaskState.Completed,
        comment,
    };
};

/**
 * Initiate state transition of a Task instance to `Abandoned`.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export const moveToAbandoned = async (
    eventStore: EventStore<TaskEvent, TaskEvents, TaskEventRepository>,
    taskId: string,
    comment?: string
): Promise<Task> => {
    const task = await getTaskByTaskId(eventStore, taskId);
    validateStateTransition(task.state, TaskState.Abandoned);
    await eventStore.appendEvent(taskId, TaskEvent.Abandon, {
        state: TaskState.Abandoned,
        comment,
    });
    return {
        ...task,
        state: TaskState.Abandoned,
        comment,
    };
};

/**
 * Initiate state transition of a Task instance to Paused.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export const moveToPaused = async (
    eventStore: EventStore<TaskEvent, TaskEvents, TaskEventRepository>,
    taskId: string,
    comment?: string
): Promise<Task> => {
    const task = await getTaskByTaskId(eventStore, taskId);
    validateStateTransition(task.state, TaskState.Paused);
    await eventStore.appendEvent(taskId, TaskEvent.MoveToPaused, {
        state: TaskState.Paused,
        comment,
    });
    return {
        ...task,
        state: TaskState.Paused,
        comment,
    };
};
