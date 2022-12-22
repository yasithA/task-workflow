/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task, TaskEvent } from '../task';
import {
    createTask,
    moveToAbandoned,
    moveToCompleted,
    moveToInProgress,
    moveToPaused,
} from '../task-command-utils';
import { ExtendedGraphQLContext } from '../../../common/types/apollo-context';

/**
 * GraphQL resolvers for mutations related to Task
 */
export const taskMutationResolvers = {
    Mutation: {
        createTask: createOrChangeTaskState(TaskEvent.Create),
        moveTaskToInProgress: createOrChangeTaskState(
            TaskEvent.MoveToInProgress
        ),
        moveTaskToCompleted: createOrChangeTaskState(TaskEvent.MoveToCompleted),
        moveTaskToAbandoned: createOrChangeTaskState(TaskEvent.Abandon),
        moveTaskToPaused: createOrChangeTaskState(TaskEvent.MoveToPaused),
    },
};

/**
 * Returns the resolver function that handles either the task creation
 * or state change.
 *
 * @param taskEvent
 * @returns
 */
function createOrChangeTaskState(taskEvent: TaskEvent) {
    return async (
        _parent: unknown,
        args: Record<string, any>,
        contextValue: ExtendedGraphQLContext,
        _info: unknown
    ): Promise<Task> => {
        const { taskEventStore } = contextValue;
        let task: Task;
        switch (taskEvent) {
            case TaskEvent.MoveToInProgress:
                task = await moveToInProgress(
                    taskEventStore,
                    args.input.id,
                    args.input.comment
                );
                return task;
            case TaskEvent.MoveToPaused:
                task = await moveToPaused(
                    taskEventStore,
                    args.input.id,
                    args.input.comment
                );
                return task;
            case TaskEvent.MoveToCompleted:
                task = await moveToCompleted(
                    taskEventStore,
                    args.input.id,
                    args.input.comment
                );
                return task;
            case TaskEvent.Abandon:
                task = await moveToAbandoned(
                    taskEventStore,
                    args.input.id,
                    args.input.comment
                );
                return task;
            case TaskEvent.Create:
                task = await createTask(
                    taskEventStore,
                    args.input.name,
                    args.input.description,
                    args.input.comment
                );
                return task;
            default:
                // eslint-disable-next-line no-case-declarations
                const exhaustiveCheck: never = taskEvent;
                throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
        }
    };
}
