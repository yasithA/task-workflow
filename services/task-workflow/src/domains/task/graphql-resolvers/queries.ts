import { Task } from '../task';
import { ExtendedGraphQLContext } from '../../../common/types/apollo-context';
import { getTasks as getTasksUtil } from '../task-query-utils';

/**
 * GraphQL resolvers for queries related to Task
 */
export const taskQueryResolvers = {
    Query: {
        tasks(
            _parent: unknown,
            _args: Record<string, unknown>,
            contextValue: ExtendedGraphQLContext,
            _info: unknown
        ) {
            return getTasks(contextValue);
        },
    },
};

/**
 * Retrieve all tasks
 *
 * @param contextValue
 * @returns
 */
async function getTasks(contextValue: ExtendedGraphQLContext): Promise<Task[]> {
    const { taskEventStore } = contextValue;
    return getTasksUtil(taskEventStore);
}
