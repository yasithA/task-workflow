import { PrismaClient } from '../../../prisma/generated/prisma/client';
import { createPrivateKey, generateKeyPairSync, KeyObject } from 'crypto';
import { Express } from 'express';

/**
 * Initialize signing keys for the application.
 * When this method is called, it checks if there's already
 * an active (un-revoked) signing key exists. If not, it
 * will create a new signing key.
 *
 * @param app
 */
export async function initializeSigningKeys(app: Express): Promise<void> {
    const prisma: PrismaClient = app.get('prismaClient');
    const signingKey = await prisma.signingKey.findFirst({
        where: {
            isRevoked: false,
        },
    });
    if (signingKey === null) {
        const { privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });

        const exportedPrivateKey = privateKey
            .export({
                format: 'pem',
                type: 'pkcs8',
            })
            .toString();

        await prisma.signingKey.create({
            data: {
                privateKey: exportedPrivateKey,
            },
        });
    }
}

/**
 * Get the KeyObject version of the active signing key
 * by reading the `signingKey` table.
 *
 * @param prisma
 * @returns
 */
export async function getPrivateKey(prisma: PrismaClient): Promise<KeyObject> {
    const exportedPrivateKey = await prisma.signingKey.findFirst({
        where: {
            isRevoked: false,
        },
    });
    if (exportedPrivateKey === null) {
        throw new Error('No active private key found. Contact support.');
    }

    const privateKey = createPrivateKey(exportedPrivateKey.privateKey);
    return privateKey;
}
