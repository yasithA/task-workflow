export const taskQueryResolver = {
    Query: {
        tasks: () => tasks,
    },
};

const tasks = [
    {
        id: 'task-1',
        name: 'Create GQL Mutations',
        description: 'Create GQL Mutations for task creation',
        state: 'Planned',
    },
    {
        id: 'task-2',
        name: 'Implement Unit Tests',
        description: 'Implement unit tests for GQL resolvers',
        state: 'Planned',
        comment: 'depends on task-1',
    },
];
