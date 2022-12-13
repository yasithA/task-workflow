import { User } from '@prisma/client';
import { JWTOptions } from '@task-workflow/user-auth';
import { createPublicKey, KeyObject } from 'crypto';
import { calculateJwkThumbprint, exportJWK, JWK, SignJWT } from 'jose';

/**
 * Generate a signed JWT that contains task-workflow specific
 * information and sign it with the active signing key.
 *
 * @param user
 * @param payload
 * @param privateKey
 * @returns
 */
export async function generateSignedToken(
    user: User,
    payload: Record<string, unknown>,
    privateKey: KeyObject
): Promise<string> {
    const privateJwk = await exportJWK(privateKey);

    const thumbprint = await calculateJwkThumbprint(privateJwk);

    return (
        new SignJWT(payload)
            .setIssuer(JWTOptions.ISSUER)
            .setSubject(user.id)
            .setProtectedHeader({
                alg: JWTOptions.ALGORITHM,
                kid: thumbprint,
            })
            .setAudience(JWTOptions.AUDIENCE)
            .setIssuedAt()
            // TODO: Set as a env-var
            .setExpirationTime('1h')
            .sign(privateKey)
    );
}

/**
 * Get JWK object from the active signing key.
 *
 * @param privateKey
 * @returns
 */
export async function getJwk(privateKey: KeyObject): Promise<JWK> {
    const publicKey = createPublicKey(privateKey);
    const publicJwk = await exportJWK(publicKey);
    return publicJwk;
}
