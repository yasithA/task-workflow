import {
    AuthContext,
    PrismaClient,
} from '../../prisma/generated/prisma/client';
import path from 'path';
import { getPrismaClient } from '../test-utils';
import request from 'supertest';
import express from 'express';
import { handleAuthCallback } from './auth-callback';
import { getAllConfig, AppContextKeys } from '../common/config';
import nock from 'nock';

describe('auth-callback-handler', () => {
    let prismaClient: PrismaClient;
    const app = express();
    app.get('/auth-callback', handleAuthCallback);
    const config = getAllConfig();
    let testAgent: request.SuperTest<request.Test>;
    const googleTokenEndpointBasePath = 'https://oauth2.googleapis.com';
    const googleUserInfoEndpointBase = 'https://openidconnect.googleapis.com';
    let authContext: AuthContext;

    beforeAll(async () => {
        prismaClient = getPrismaClient(
            path.basename(__filename).replace('-', '_')
        );
        app.set(AppContextKeys.config, config);
        app.set(AppContextKeys.prismaClient, prismaClient);
        app.set(AppContextKeys.googleOidcEndpoints, {
            tokenEndpoint: `${googleTokenEndpointBasePath}/token`,
            userInfoEndpoint: `${googleUserInfoEndpointBase}/v1/userinfo`,
        });
        testAgent = request(app);
    });

    beforeEach(async () => {
        authContext = await prismaClient.authContext.create({
            data: {
                state: 'test-state',
                challenge: 'test-challenge',
                originUrl: 'https://origin.task-workflow.com',
            },
        });
    });

    afterEach(async () => {
        await prismaClient.authContext.deleteMany();
        await prismaClient.accessToken.deleteMany();
        await prismaClient.user.deleteMany();
    });

    it('When authContext is not found, a Bad Request 400 response is sent', async () => {
        // Act
        const resp = await testAgent.get('/auth-callback?state=invalid-state');

        // Assert
        expect(resp.status).toBe(400);
        expect(resp.body).toStrictEqual({
            message: 'Invalid Auth State. Cannot Authenticate.',
            details: { state: 'invalid-state' },
        });
    });

    it('When the authContext is found, a call to the Google tokenEndpoint is made with required params', async () => {
        // Arrange and Assert
        const scope = nock(googleTokenEndpointBasePath)
            .post('/token', {
                client_id: config.googleClientId,
                client_secret: config.googleClientSecret,
                code: 'test-code',
                code_verifier: authContext.challenge,
                grant_type: 'authorization_code',
                redirect_uri: encodeURI(
                    `http://localhost:${config.port}/auth-callback`
                ),
            })
            .reply(200, {
                access_token: 'dummy-access-token',
            });
        // Act
        await testAgent.get('/auth-callback?state=test-state&code=test-code');

        expect(scope.isDone()).toBe(true);
    });

    it('When the call to token endpoint fails, a response with status code 500 is returned', async () => {
        nock(googleTokenEndpointBasePath)
            .post('/token', {
                client_id: config.googleClientId,
                client_secret: config.googleClientSecret,
                code: 'test-code',
                code_verifier: authContext.challenge,
                grant_type: 'authorization_code',
                redirect_uri: encodeURI(
                    `http://localhost:${config.port}/auth-callback`
                ),
            })
            .reply(400, {
                error: 'dummy-error',
            });

        // Act
        const response = await testAgent.get(
            '/auth-callback?state=test-state&code=test-code'
        );

        // Assert
        expect(response.status).toBe(500);
        expect(response.body.message).toBe(
            'Error occurred while authenticating'
        );
        expect(response.body.error).toBeDefined();
    });

    it('When the call to token endpoint is successful, a call to the User Info endpoint is made with access token received', async () => {
        // Arrange and Assert
        const dummyAccessToken = 'dummy-access-token';
        nock(googleTokenEndpointBasePath).post('/token').reply(200, {
            access_token: dummyAccessToken,
        });

        const userInfoScope = nock(googleUserInfoEndpointBase)
            .get('/v1/userinfo')
            .matchHeader('Authorization', `Bearer ${dummyAccessToken}`)
            .reply(200, {
                email: 'jonas@sicmundus.time',
            });

        // Act
        await testAgent.get('/auth-callback?state=test-state&code=test-code');

        expect(userInfoScope.isDone()).toBe(true);
    });

    it('When the call to the User Info endpoint fails, a response with status code 500 is returned', async () => {
        // Arrange and Assert
        const dummyAccessToken = 'dummy-access-token';
        nock(googleTokenEndpointBasePath).post('/token').reply(200, {
            access_token: dummyAccessToken,
        });

        nock(googleUserInfoEndpointBase)
            .get('/v1/userinfo')
            .matchHeader('Authorization', `Bearer ${dummyAccessToken}`)
            .reply(400, {
                error: 'dummy-error',
            });

        // Act
        const response = await testAgent.get(
            '/auth-callback?state=test-state&code=test-code'
        );

        // Assert
        expect(response.status).toBe(500);
        expect(response.body.message).toBe(
            'Error occurred while authenticating'
        );
        expect(response.body.error).toBeDefined();
    });

    it.each([
        [
            'with email and name',
            { email: 'jonas@sicmundus.time', name: 'Jonas Khanwald' },
            {
                email: 'jonas@sicmundus.time',
                name: 'Jonas Khanwald',
                profilePicture: null,
            },
        ],
        [
            'with only email',
            { email: 'jonas@sicmundus.time' },
            {
                email: 'jonas@sicmundus.time',
                name: 'jonas',
                profilePicture: null,
            },
        ],
        [
            'with email, name and picture',
            {
                email: 'jonas@sicmundus.time',
                name: 'Jonas Khanwald',
                picture: 'https://link.to/profile',
            },
            {
                email: 'jonas@sicmundus.time',
                name: 'Jonas Khanwald',
                profilePicture: 'https://link.to/profile',
            },
        ],
    ])(
        'When the call to the User Info endpoint responds with %s, if a record by received email value does not exist in the user table, a new User is created in the database.',
        async (_testcase, userInfoReply, expectedDbValues) => {
            // Arrange
            const dummyAccessToken = 'dummy-access-token';
            nock(googleTokenEndpointBasePath).post('/token').reply(200, {
                access_token: dummyAccessToken,
            });

            nock(googleUserInfoEndpointBase)
                .get('/v1/userinfo')
                .matchHeader('Authorization', `Bearer ${dummyAccessToken}`)
                .reply(200, userInfoReply);

            // Act
            await testAgent.get(
                '/auth-callback?state=test-state&code=test-code'
            );

            // Assert
            const insertedUser = await prismaClient.user.findFirst({
                where: {
                    email: userInfoReply.email,
                },
            });

            expect(insertedUser).toMatchObject({
                ...expectedDbValues,
            });
        }
    );

    it('When the call to the User Info endpoint is successful, if the received email value exists in the user table, no new user is created', async () => {
        // Arrange
        const dummyAccessToken = 'dummy-access-token';
        const email = 'jonas@sicmundus.time';
        await prismaClient.user.create({
            data: {
                email,
                name: 'jonas',
            },
        });

        nock(googleTokenEndpointBasePath).post('/token').reply(200, {
            access_token: dummyAccessToken,
        });

        nock(googleUserInfoEndpointBase)
            .get('/v1/userinfo')
            .matchHeader('Authorization', `Bearer ${dummyAccessToken}`)
            .reply(200, {
                email,
            });

        const userCreateSpy = jest.spyOn(prismaClient.user, 'create');

        // Act
        await testAgent.get('/auth-callback?state=test-state&code=test-code');

        // Assert
        expect(userCreateSpy).not.toHaveBeenCalled();

        // Teardown
        jest.clearAllMocks();
    });

    it('When token is received and a user is created or exists, a new access token is created and the response has IAM_TOKEN cookie set with token value', async () => {
        // Arrange
        const dummyAccessToken = 'dummy-access-token';
        const email = 'jonas@sicmundus.time';

        nock(googleTokenEndpointBasePath).post('/token').reply(200, {
            access_token: dummyAccessToken,
            expires_in: 3000,
            refresh_token: 'refresh-token',
        });

        nock(googleUserInfoEndpointBase)
            .get('/v1/userinfo')
            .matchHeader('Authorization', `Bearer ${dummyAccessToken}`)
            .reply(200, {
                email,
            });

        // Act
        const response = await testAgent.get(
            '/auth-callback?state=test-state&code=test-code'
        );

        // Assert
        const accessToken = await prismaClient.accessToken.findFirst({
            where: {
                user: {
                    email,
                },
            },
        });
        const authContext = await prismaClient.authContext.findFirst({
            where: {
                state: 'test-state',
            },
        });

        expect(accessToken).toMatchObject({
            idpRefreshToken: 'refresh-token',
            idpAccessToken: 'dummy-access-token',
        });
        const cookieProps = response.get('Set-Cookie')[0].split('; ');
        expect(cookieProps[0].split('=')[1]).toBe(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            encodeURIComponent(accessToken!.iamToken)
        );
        expect(authContext).toBeNull();
    });
});
