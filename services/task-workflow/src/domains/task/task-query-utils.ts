import { EventStore } from '../../event-store/event-store';
import { TaskEvents } from './task-events';
import { Task, TaskState } from '@prisma/client';

/**
 * Returns the latest state for a given Task ID.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export const getTaskStateByTaskId = (
    eventStore: EventStore<TaskEvents>,
    taskId: string
): TaskState => {
    const allEvents = eventStore.getAllEventsByEntityId(taskId);
    const allStates = allEvents.map((event) => (event.payload as Task).state);
    return allStates[allStates.length - 1];
};

/**
 * Returns the latest Task object for a given task ID.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export const getTaskByTaskId = (
    eventStore: EventStore<TaskEvents>,
    taskId: string
): Task => {
    const allEvents = eventStore.getAllEventsByEntityId(taskId);
    const foldedDomainEvent = allEvents.reduce((prevEvent, currEvent) => {
        return {
            ...currEvent,
            payload: {
                ...Object(prevEvent.payload),
                ...Object(currEvent.payload),
            },
        };
    });
    return foldedDomainEvent.payload as Task;
};
