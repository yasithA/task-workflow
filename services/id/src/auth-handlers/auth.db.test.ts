import { PrismaClient } from '@prisma/client';
import path from 'path';
import { getPrismaClient } from '../test-utils';
import request from 'supertest';
import express from 'express';
import { handleAuth, prepareAuthUrl } from './auth';
import { getAllConfig, AppContextKeys } from '../common/config';
import { createHash } from 'crypto';

describe('auth-handler', () => {
    let prismaClient: PrismaClient;
    const app = express();
    app.get('/auth', handleAuth);
    const config = getAllConfig();
    let testAgent: request.SuperTest<request.Test>;
    const googleAuthEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    beforeAll(async () => {
        prismaClient = getPrismaClient(path.basename(__filename));
        app.set(AppContextKeys.config, config);
        app.set(AppContextKeys.prismaClient, prismaClient);
        app.set(AppContextKeys.googleOidcEndpoints, {
            authorizationEndpoint: googleAuthEndpoint,
        });
        testAgent = request(app);
    });

    afterAll(async () => {
        await prismaClient.authContext.deleteMany();
    });

    it('When originUrl is not found in request parameters, an error is raised', async () => {
        // Act
        const resp = await testAgent.get('/auth');

        // Assert
        expect(resp.status).toBe(500);
        expect(resp.body).toEqual({
            message: 'Error while trying to to authenticate.',
            originalMessage:
                'Origin URL not found. Cannot proceed with the authentication flow.',
        });
    });

    it('When originUrl is provided, an authContext is created and saved and a call to auth URL is done', async () => {
        // Arrange
        const originUrl = encodeURI(`http://localhost:${config.port}/token`);

        // Act
        const resp = await testAgent.get(`/auth?originUrl=${originUrl}`);

        // Assert
        expect(resp.status).toBe(302);

        const authContext = await prismaClient.authContext.findMany();
        const hashedCodeChallenge = createHash('sha256')
            .update(authContext[0].challenge)
            .digest()
            .toString('base64url');

        const authUrl = prepareAuthUrl(
            googleAuthEndpoint,
            config.googleClientId,
            config.port,
            authContext[0].state,
            hashedCodeChallenge
        );

        expect(resp.headers['location']).toStrictEqual(authUrl.href);
    });
});
