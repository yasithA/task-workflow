import { PrismaClient } from '../prisma/generated/prisma/client';
import { ValidateJwt } from '@task-workflow/user-auth';
import express from 'express';
import { getAllConfig, AppContextKeys } from './common/config';
import { getGoogleOidcEndpoints, initializeSigningKeys } from './common/utils';
import { setupRoutes } from './setup-routes';

async function init() {
    const config = getAllConfig();
    const app = express();
    const googleOidcEndpoints = await getGoogleOidcEndpoints(
        config.googleOidcDiscoveryDocument
    );
    const prismaClient = new PrismaClient();

    app.set(AppContextKeys.config, config);
    app.set(AppContextKeys.prismaClient, prismaClient);
    app.set(AppContextKeys.googleOidcEndpoints, googleOidcEndpoints);

    app.use(ValidateJwt(`http://localhost:${config.port}`));
    setupRoutes(app);

    await initializeSigningKeys(app);

    app.listen(config.port, () => {
        console.log(`ID Service listening on port ${config.port}`);
    });
}

init();
