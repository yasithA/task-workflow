import { Request, Response } from 'express';
import { randomBytes, createHash } from 'crypto';
import { PrismaClient } from '../../prisma/generated/prisma/client';
import { Config, AppContextKeys } from '../common/config';
import { URL } from 'url';

export async function handleAuth(req: Request, res: Response) {
    try {
        const config: Config = req.app.get(AppContextKeys.config);
        const prisma: PrismaClient = req.app.get(AppContextKeys.prismaClient);
        const { authorizationEndpoint } = req.app.get(
            AppContextKeys.googleOidcEndpoints
        );

        const originUrl = req.query.originUrl;

        if (originUrl === undefined) {
            throw new Error(
                'Origin URL not found. Cannot proceed with the authentication flow.'
            );
        }

        const hasher = createHash('sha256');
        const state = randomBytes(32).toString('hex');
        const codeChallenge = randomBytes(8).toString('hex');
        const hashedCodeChallenge = hasher
            .update(codeChallenge)
            .digest()
            .toString('base64url');

        await prisma.authContext.create({
            data: {
                state: state,
                challenge: codeChallenge,
                originUrl: String(originUrl),
            },
        });

        const googleAuthUrl = prepareAuthUrl(
            authorizationEndpoint,
            config.googleClientId,
            config.port,
            state,
            hashedCodeChallenge
        );

        res.redirect(googleAuthUrl.href);
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            message: 'Error while trying to to authenticate.',
            originalMessage: (error as Error).message,
        });
    }
}

export function prepareAuthUrl(
    authorizationEndpoint: string,
    googleClientId: string,
    port: number,
    state: string,
    hashedCodeChallenge: string
): URL {
    /*const googleAuthUrl = new URL(
        'o/oauth2/v2/auth',
        'https://accounts.google.com'
    );*/
    const googleAuthUrl = new URL(authorizationEndpoint);
    googleAuthUrl.searchParams.append('response_type', 'code');
    googleAuthUrl.searchParams.append('client_id', googleClientId);
    googleAuthUrl.searchParams.append('scope', 'openid email profile');
    googleAuthUrl.searchParams.append(
        'redirect_uri',
        `http://localhost:${port}/auth-callback`
    );
    googleAuthUrl.searchParams.append('state', state);
    googleAuthUrl.searchParams.append('code_challenge', hashedCodeChallenge);
    googleAuthUrl.searchParams.append('code_challenge_method', 'S256');
    googleAuthUrl.searchParams.append('access_type', 'offline');
    return googleAuthUrl;
}
