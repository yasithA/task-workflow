import { PrismaClient, Task } from '@prisma/client';

export const taskQueryResolvers = {
    Query: {
        tasks: getTasks,
    },
};

async function getTasks(): Promise<Task[]> {
    const prismaClient = new PrismaClient();
    return prismaClient.task.findMany();
}
