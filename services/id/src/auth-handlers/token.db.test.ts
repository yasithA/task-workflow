import {
    AccessToken,
    PrismaClient,
    User,
} from '../../prisma/generated/prisma/client';
import path from 'path';
import { getPrismaClient } from '../test-utils';
import request from 'supertest';
import express from 'express';
import { handleToken } from './token';
import { getAllConfig, AppContextKeys } from '../common/config';
import axios from 'axios';
import { jwtVerify } from 'jose';
import { JWTOptions } from '@task-workflow/user-auth';
import { getPrivateKey } from '../common/utils';

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEwAIBADANBgkqhkiG9w0BAQEFAASCBKowggSmAgEAAoIBAQDpLtqxS7OrlD/d
T2tuz4+QNUh2OCa2Bat4bmpY+wL3FdkqIxXUCJX0tfKpCwBikKoQMzddt+ZmoZvj
zIuFv9eploqBJhoL+HYOMzuWCshACn33TZGvx9SYs3aK+vm2cvFRQ6cw5zZJC2v1
2DNM41hblm7c/DK8BaTkPq54hSEu1jOlwH562g10vcivbvjoojL9VSwPAAzt2Gup
IrxTbEUIaVq7iKQ5O2/MOjCcAwcyt8TurUHpZlAMBCUGbFFCzIqWfkMiwq/rFq42
wdGAEApy1TFkbwzhAkjHdLoC6CF3dFkLgJrkB7193wvyaU1gEKtCE5nt1LR/hq3h
quUtxqO3AgMBAAECggEBANX6C+7EA/TADrbcCT7fMuNnMb5iGovPuiDCWc6bUIZC
Q0yac45l7o1nZWzfzpOkIprJFNZoSgIF7NJmQeYTPCjAHwsSVraDYnn3Y4d1D3tM
5XjJcpX2bs1NactxMTLOWUl0JnkGwtbWp1Qq+DBnMw6ghc09lKTbHQvhxSKNL/0U
C+YmCYT5ODmxzLBwkzN5RhxQZNqol/4LYVdji9bS7N/UITw5E6LGDOo/hZHWqJsE
fgrJTPsuCyrYlwrNkgmV2KpRrGz5MpcRM7XHgnqVym+HyD/r9E7MEFdTLEaiiHcm
Ish1usJDEJMFIWkF+rnEoJkQHbqiKlQBcoqSbCmoMWECgYEA/4379mMPF0JJ/EER
4VH7/ZYxjdyphenx2VYCWY/uzT0KbCWQF8KXckuoFrHAIP3EuFn6JNoIbja0NbhI
HGrU29BZkATG8h/xjFy/zPBauxTQmM+yS2T37XtMoXNZNS/ubz2lJXMOapQQiXVR
l/tzzpyWaCe9j0NT7DAU0ZFmDbECgYEA6ZbjkcOs2jwHsOwwfamFm4VpUFxYtED7
9vKzq5d7+Ii1kPKHj5fDnYkZd+mNwNZ02O6OGxh40EDML+i6nOABPg/FmXeVCya9
Vump2Yqr2fAK3xm6QY5KxAjWWq2kVqmdRmICSL2Z9rBzpXmD5o06y9viOwd2bhBo
0wB02416GecCgYEA+S/ZoEa3UFazDeXlKXBn5r2tVEb2hj24NdRINkzC7h23K/z0
pDZ6tlhPbtGkJodMavZRk92GmvF8h2VJ62vAYxamPmhqFW5Qei12WL+FuSZywI7F
q/6oQkkYT9XKBrLWLGJPxlSKmiIGfgKHrUrjgXPutWEK1ccw7f10T2UXvgECgYEA
nXqLa58G7o4gBUgGnQFnwOSdjn7jkoppFCClvp4/BtxrxA+uEsGXMKLYV75OQd6T
IhkaFuxVrtiwj/APt2lRjRym9ALpqX3xkiGvz6ismR46xhQbPM0IXMc0dCeyrnZl
QKkcrxucK/Lj1IBqy0kVhZB1IaSzVBqeAPrCza3AzqsCgYEAvSiEjDvGLIlqoSvK
MHEVe8PBGOZYLcAdq4YiOIBgddoYyRsq5bzHtTQFgYQVK99Cnxo+PQAvzGb+dpjN
/LIEAS2LuuWHGtOrZlwef8ZpCQgrtmp/phXfVi6llcZx4mMm7zYmGhh2AsA9yEQc
acgc4kgDThAjD7VlXad9UHpNMO8=
-----END PRIVATE KEY-----`;

describe('token-handler', () => {
    let prismaClient: PrismaClient;
    const app = express();
    app.get('/token', handleToken);
    const config = getAllConfig();
    let testAgent: request.SuperTest<request.Test>;
    let user: User;
    let accessToken: AccessToken;
    const googleEndpoints = {
        authorizationEndpoint: 'http://auth-endpoint.google.com',
        tokenEndpoint: 'http://token-endpoint.google.com',
        userInfoEndpoint: 'http://user-info-endpoint.google.com',
    };

    beforeAll(async () => {
        prismaClient = getPrismaClient(
            path.basename(__filename).replace('-', '_')
        );
        app.set(AppContextKeys.config, config);
        app.set(AppContextKeys.prismaClient, prismaClient);
        app.set(AppContextKeys.googleOidcEndpoints, googleEndpoints);
        testAgent = request(app);
        user = await prismaClient.user.create({
            data: {
                name: 'Jonas Khanwald',
                email: 'jonas@sicmundus.time',
            },
        });
    });

    beforeEach(async () => {
        accessToken = await prismaClient.accessToken.create({
            data: {
                userId: user.id,
                iamToken: 'TEST_IAM_TOKEN',
                iamTokenExpiresAt: new Date(Date.now() + 10 * 1000),
                idpAccessToken: 'TEST_IDP_ACCESS_TOKEN',
                idpAccessTokenExpiresAt: new Date(Date.now() + 10 * 1000),
                idpRefreshToken: 'TEST_IDP_REFRESH_TOKEN',
            },
        });
    });

    afterEach(async () => {
        await prismaClient.accessToken.deleteMany();
        await prismaClient.signingKey.deleteMany();
    });

    afterAll(async () => {
        await prismaClient.user.deleteMany();
    });

    describe('When cookie is invalid', () => {
        it('When no authentication cookies are found, a redirect is performed with Origin URL set as the token endpoint', async () => {
            // Act
            const resp = await testAgent.get('/token');

            // Assert
            expect(resp.status).toBe(302);
            expect(resp.headers.location).toBe(
                '/auth?originUrl=http://localhost:3000/token'
            );
        });

        it('When a cookie is found, but does not have a corresponding record in the accessToken table, a redirection is performed with Origin URL set as the token endpoint', async () => {
            // Act
            const resp = await testAgent
                .get('/token')
                .set('Cookie', ['IAM_TOKEN=NON_EXISTENT_TEST_IAM_TOKEN']);

            // Assert
            expect(resp.status).toBe(302);
            expect(resp.headers.location).toBe(
                '/auth?originUrl=http://localhost:3000/token'
            );
        });

        it('When a cookie is found, is expired, a redirection is performed with Origin URL set as the token endpoint', async () => {
            // Arrange
            await prismaClient.accessToken.update({
                data: {
                    iamTokenExpiresAt: new Date(Date.now() - 10 * 1000),
                },
                where: {
                    id: accessToken.id,
                },
            });

            // Act
            const resp = await testAgent
                .get('/token')
                .set('Cookie', ['IAM_TOKEN=TEST_IAM_TOKEN']);

            // Assert
            expect(resp.status).toBe(302);
            expect(resp.headers.location).toBe(
                '/auth?originUrl=http://localhost:3000/token'
            );
        });
    });

    describe('When the cookie is valid', () => {
        it('When the IDP Access Token is expired and IDP Refresh Token is not found, a redirection is performed with Origin URL set as the token endpoint', async () => {
            // Arrange
            await prismaClient.accessToken.update({
                data: {
                    idpAccessTokenExpiresAt: new Date(Date.now() - 10 * 1000),
                    idpRefreshToken: null,
                },
                where: {
                    id: accessToken.id,
                },
            });

            // Act
            const resp = await testAgent
                .get('/token')
                .set('Cookie', ['IAM_TOKEN=TEST_IAM_TOKEN']);

            // Assert
            expect(resp.status).toBe(302);
            expect(resp.headers.location).toBe(
                '/auth?originUrl=http://localhost:3000/token'
            );
        });

        it('When the IDP Access Token is expired but an IDP Refresh Token is found, a call to the token endpoint is made using the refresh token', async () => {
            // Arrange
            const testRefreshToken = 'test-refresh-token';
            await prismaClient.accessToken.update({
                data: {
                    idpAccessTokenExpiresAt: new Date(Date.now() - 10 * 1000),
                    idpRefreshToken: testRefreshToken,
                },
                where: {
                    id: accessToken.id,
                },
            });

            await prismaClient.signingKey.create({
                data: {
                    privateKey: privateKey,
                },
            });

            const axiosPostSpy = jest.spyOn(axios, 'post').mockResolvedValue({
                data: {
                    access_token: 'access-token',
                    expires_in: 30,
                },
            });

            // Act
            const resp = await testAgent
                .get('/token')
                .set('Cookie', ['IAM_TOKEN=TEST_IAM_TOKEN']);

            // Assert
            expect(resp.status).toBe(200);

            const requestBody = new URLSearchParams({
                client_id: config.googleClientId,
                client_secret: config.googleClientSecret,
                refresh_token: testRefreshToken,
                grant_type: 'refresh_token',
            });

            expect(axiosPostSpy).toHaveBeenCalledWith(
                googleEndpoints.tokenEndpoint,
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            const refreshedIdpAccessToken =
                await prismaClient.accessToken.findFirst({
                    where: {
                        id: accessToken.id,
                    },
                });
            expect(refreshedIdpAccessToken?.idpAccessToken).toBeDefined();
        });

        it('When the IDP Access Token is not expired, or was successfully refreshed, a valid JWT is returned', async () => {
            // Arrange
            await prismaClient.signingKey.create({
                data: {
                    privateKey: privateKey,
                },
            });
            const privateKeyObj = await getPrivateKey(prismaClient);

            // Act
            const resp = await testAgent
                .get('/token')
                .set('Cookie', ['IAM_TOKEN=TEST_IAM_TOKEN']);

            // Assert
            expect(resp.status).toBe(200);
            const { payload } = await jwtVerify(resp.text, privateKeyObj, {
                audience: JWTOptions.AUDIENCE,
                issuer: JWTOptions.ISSUER,
            });
            expect(payload).toMatchObject({
                name: 'Jonas Khanwald',
                email: 'jonas@sicmundus.time',
                roles: ['ADMIN', 'END_USER'],
                iss: 'id-service',
                aud: 'task-workflow',
            });
        });
    });
});
