import { PrismaClient } from '../../prisma/generated/prisma/client';
import path from 'path';
import { getPrismaClient } from '../test-utils';
import request from 'supertest';
import express from 'express';
import { handleWellKnownEndpoints } from './well-known-endpoints';
import { getAllConfig, AppContextKeys } from '../common/config';
import { getJwk, getPrivateKey } from '../common/utils';

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

describe('handleWellKnownEndpoints', () => {
    let prismaClient: PrismaClient;
    const app = express();
    app.get('/.well-known/:config?', handleWellKnownEndpoints);
    const config = getAllConfig();
    let testAgent: request.SuperTest<request.Test>;

    beforeAll(async () => {
        prismaClient = getPrismaClient(
            path.basename(__filename).replace('-', '_')
        );
        app.set(AppContextKeys.config, config);
        app.set(AppContextKeys.prismaClient, prismaClient);
        testAgent = request(app);
        await prismaClient.signingKey.create({
            data: {
                privateKey: privateKey,
            },
        });
    });

    afterAll(async () => {
        await prismaClient.signingKey.deleteMany();
    });

    it('When well-known endpoint is accessed, the auth, token and jwks endpoints should be returned', async () => {
        // Act
        const resp = await testAgent.get('/.well-known');

        // Assert
        expect(resp.body).toEqual({
            auth: 'http://localhost:3000/auth',
            token: 'http://localhost:3000/token',
            jwks: 'http://localhost:3000/.well-known/jwks',
        });
    });

    it('When the jwks path of the well-known endpoint is accessed, the jwks should be returned', async () => {
        // Act
        const resp = await testAgent.get('/.well-known/jwks');

        // Assert
        const privateKeyObj = await getPrivateKey(prismaClient);
        const jwk = await getJwk(privateKeyObj);
        expect(resp.body).toEqual(jwk);
    });
});
