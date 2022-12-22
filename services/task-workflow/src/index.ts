import { ValidateJwt, PerformAuthorization } from '@task-workflow/user-auth';
import express from 'express';
import http from 'http';
import { setupGraphQLEndpoint, startApolloServer } from './graphql';

async function init() {
    const app = express();
    const port = 3001;
    const httpServer = http.createServer(app);

    const apolloServer = await startApolloServer(httpServer);

    app.use(ValidateJwt('http://localhost:3000'));

    setupGraphQLEndpoint(app, apolloServer);

    httpServer.listen(port, () => {
        console.log(`Task Workflow Service listening on port ${port}`);
    });
}

init();
