import { PrismaClient } from '../../../prisma/generated/prisma/client';
import path from 'path';
import { getPrismaClient } from '../../test-utils';
import { getPrivateKey, initializeSigningKeys } from './signing-keys';
import express from 'express';
import { AppContextKeys } from '../config';

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

describe('signing-keys-handler', () => {
    let prismaClient: PrismaClient;
    const app = express();
    beforeAll(async () => {
        prismaClient = getPrismaClient(
            path.basename(__filename).replace('-', '_')
        );
        app.set(AppContextKeys.prismaClient, prismaClient);
        await prismaClient.signingKey.deleteMany();
    });

    afterEach(async () => {
        await prismaClient.signingKey.deleteMany();
    });

    describe('initializeSigningKeys', () => {
        it('When no active signing key exists, a new key is created', async () => {
            // Act
            await initializeSigningKeys(app);

            // Assert
            const insertedSigningKey = await prismaClient.signingKey.findFirst({
                where: {
                    isRevoked: false,
                },
            });
            expect(insertedSigningKey).not.toBeNull();
        });

        it('When an active signing key exists, a new key is not created', async () => {
            // Arrange
            await prismaClient.signingKey.create({
                data: {
                    privateKey: 'test-private-key',
                    isRevoked: false,
                },
            });

            // Act
            await initializeSigningKeys(app);

            // Assert
            const signingKeyCount = await prismaClient.signingKey.count();
            expect(signingKeyCount).toBe(1);
        });
    });

    describe('getPrivateKey', () => {
        it('When no signing key exists, an error is raised', async () => {
            // Act and Assert
            await expect(getPrivateKey(prismaClient)).rejects.toThrow(
                'No active private key found. Contact support.'
            );
        });

        it('When a signing key exists, but is revoked, an error is raised', async () => {
            // Arrange
            await prismaClient.signingKey.create({
                data: {
                    privateKey: 'test-private-key',
                    isRevoked: true,
                },
            });

            // Act and Assert
            await expect(getPrivateKey(prismaClient)).rejects.toThrow(
                'No active private key found. Contact support.'
            );
        });

        it('When a non-revoked signing key exists, the private key is returned', async () => {
            await prismaClient.signingKey.create({
                data: {
                    privateKey,
                    isRevoked: false,
                },
            });

            // Act
            const privateKeyObject = await getPrivateKey(prismaClient);

            // Assert
            expect(privateKeyObject).toBeDefined();
        });
    });
});
