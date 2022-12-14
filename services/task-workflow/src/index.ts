import { ApolloServer } from '@apollo/server';
import { ValidateJwt, PerformAuthorization } from '@task-workflow/user-auth';
import express from 'express';
import { taskQueryResolver } from './domains/task';
import { taskTypeDefs } from './graphql/schema';
import { getTasks } from './route-handlers';
import { json } from 'body-parser';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

async function init() {
    const app = express();
    const port = 3001;
    const httpServer = http.createServer(app);

    const apolloServer = new ApolloServer({
        typeDefs: taskTypeDefs,
        resolvers: {
            ...taskQueryResolver,
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await apolloServer.start();

    app.use(ValidateJwt('http://localhost:3000'));

    app.get('/tasks', PerformAuthorization(['ADMIN']), getTasks);

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        json(),
        //PerformAuthorization(['END_USER']),
        expressMiddleware(apolloServer)
    );

    httpServer.listen(port, () => {
        console.log(`Task Workflow Service listening on port ${port}`);
    });
}

init();
