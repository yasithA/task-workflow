import { EventStore } from '../../event-store/event-store';
import { TaskEvent, Task, TaskState, PersistedTaskEvent } from './task';
import { Prisma, TaskEvents } from '../../../prisma/generated/prisma/client';
import { TaskEventRepository } from './task-event-respository';

/**
 * Returns the latest state for a given Task ID.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export async function getTaskStateByTaskId(
    eventStore: EventStore<TaskEvent, TaskEvents, TaskEventRepository>,
    taskId: string
): Promise<TaskState> {
    const allEvents = await eventStore.getAllEventsByEntityId(taskId);
    const allStates = allEvents.map(
        (event) =>
            ((event as unknown as PersistedTaskEvent).payload as Task).state
    );
    return allStates[allStates.length - 1];
}

/**
 * Returns the latest Task object for a given task ID.
 *
 * @param eventStore
 * @param taskId
 * @returns
 */
export async function getTaskByTaskId(
    eventStore: EventStore<TaskEvent, TaskEvents, TaskEventRepository>,
    taskId: string
): Promise<Task> {
    const allEvents = await eventStore.getAllEventsByEntityId(taskId);
    const foldedDomainEvent = reduceTaskEventStream(allEvents);
    return foldedDomainEvent.payload as Task;
}

/**
 * Retrieve all tasks
 *
 * @param eventStore
 * @returns
 */
export async function getTasks(
    eventStore: EventStore<TaskEvent, TaskEvents, TaskEventRepository>
): Promise<Task[]> {
    const taskEvents = await eventStore.getAllEntities();

    const tasks: Task[] = [];
    for (const taskEvent of taskEvents) {
        const task = reduceTaskEventStream(taskEvent.eventLog);
        tasks.push(task.payload);
    }
    return tasks;
}

/**
 * Reduce the event stream for a specific task to the final state.
 * @param eventLog
 * @returns
 */
function reduceTaskEventStream(
    eventLog: Prisma.JsonValue[]
): PersistedTaskEvent {
    return eventLog.reduce((prevEvent, currEvent) => {
        return {
            ...(currEvent as unknown as PersistedTaskEvent),
            payload: {
                ...Object((prevEvent as unknown as PersistedTaskEvent).payload),
                ...Object((currEvent as unknown as PersistedTaskEvent).payload),
            },
        };
    }) as unknown as PersistedTaskEvent;
}
