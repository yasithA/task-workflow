import { ApolloServer, ContextFunction } from '@apollo/server';
import {
    TaskEvent,
    taskQueryResolvers,
    taskMutationResolvers,
    TaskEventRepository,
} from '../domains/task';
import { taskTypeDefs } from './schema';
import { json } from 'body-parser';
import cors from 'cors';
import {
    ExpressContextFunctionArgument,
    expressMiddleware,
} from '@apollo/server/express4';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { PrismaClient, TaskEvents } from '../../prisma/generated/prisma/client';
import { EventStore } from '../event-store';
import { ExtendedGraphQLContext } from '../common/types/apollo-context';
import { Application } from 'express';

/**
 * Start an Apollo Server to serve GraphQL endpoints.
 *
 * @param httpServer
 * @returns
 */
export async function startApolloServer(
    httpServer: http.Server<
        typeof http.IncomingMessage,
        typeof http.ServerResponse
    >
): Promise<ApolloServer<ExtendedGraphQLContext>> {
    const apolloServer = new ApolloServer({
        typeDefs: taskTypeDefs,
        resolvers: {
            ...taskQueryResolvers,
            ...taskMutationResolvers,
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await apolloServer.start();
    return apolloServer;
}

/**
 * Setup express middleware required to integrate the Apollo Server
 * with Express.
 *
 * @param app
 * @param apolloServer
 */
export function setupGraphQLEndpoint(
    app: Application,
    apolloServer: ApolloServer<ExtendedGraphQLContext>
) {
    const prismaClient = new PrismaClient();
    const taskEventRepository = new TaskEventRepository(prismaClient);
    const taskEventStore = new EventStore<
        TaskEvent,
        TaskEvents,
        TaskEventRepository
    >(taskEventRepository);

    const defaultContext: ContextFunction<
        [ExpressContextFunctionArgument],
        ExtendedGraphQLContext
    > = async () => ({
        prismaClient,
        taskEventStore,
    });

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        json(),
        //PerformAuthorization(['END_USER']),
        expressMiddleware(apolloServer, {
            context: defaultContext,
        })
    );
}
