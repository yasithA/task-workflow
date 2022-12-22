import { PrismaClient } from '../../prisma/generated/prisma/client';
import { Request, Response } from 'express';
import axios from 'axios';
import {
    generateSignedToken,
    getPrivateKey,
    GoogleOidcEndpoints,
} from '../common/utils';
import { AppContextKeys, Config } from '../common/config';

export async function handleToken(req: Request, res: Response): Promise<void> {
    const cookies = getCookies(req);
    const config: Config = req.app.get(AppContextKeys.config);
    const googleOidcEndpoints: GoogleOidcEndpoints = req.app.get(
        AppContextKeys.googleOidcEndpoints
    );
    const prisma: PrismaClient = req.app.get('prismaClient');
    const originUrl = decodeURI('http://localhost:3000/token');

    if (cookies === undefined) {
        res.redirect(`/auth?originUrl=${originUrl}`);
        return;
    }

    const iamToken = decodeURIComponent(cookies['IAM_TOKEN']);
    const accessToken = await prisma.accessToken.findFirst({
        where: {
            iamToken,
        },
    });

    // If the access token is not found or the IAM token is expired, the user needs to authenticate.
    if (
        accessToken === null ||
        accessToken.iamTokenExpiresAt <= new Date(Date.now())
    ) {
        res.redirect(`/auth?originUrl=${originUrl}`);
        return;
    } else if (
        accessToken !== null &&
        accessToken.iamTokenExpiresAt > new Date(Date.now())
    ) {
        // If the Access Token is expired and there's no refresh token to retrieve a new access token, the user needs to authenticate again.
        if (
            accessToken.idpAccessTokenExpiresAt <= new Date(Date.now()) &&
            accessToken.idpRefreshToken === null
        ) {
            res.redirect(`/auth?originUrl=${originUrl}`);
            return;
        } else if (
            accessToken.idpAccessTokenExpiresAt <= new Date(Date.now()) &&
            accessToken.idpRefreshToken !== null
        ) {
            try {
                await refreshAccessToken(
                    accessToken.idpRefreshToken,
                    accessToken.id,
                    prisma,
                    config,
                    googleOidcEndpoints
                );
            } catch (error) {
                res.status(500).send(
                    'Error while retrieving the refresh token.'
                );
                return;
            }
        }
    }
    const user = await prisma.user.findFirst({
        where: {
            id: accessToken.userId,
        },
    });
    if (user === null) {
        throw new Error(
            `Trying to retrieve a User Token for an invalid user [${accessToken.userId}]. Cannot proceed.`
        );
    }
    const privateKey = await getPrivateKey(prisma);
    const token = await generateSignedToken(
        user,
        {
            name: user.name,
            email: user.email,
            roles: ['ADMIN', 'END_USER'],
        },
        privateKey
    );

    res.send(token);
}

function getCookies(req: Request): Record<string, string> | undefined {
    if (req.headers.cookie !== undefined) {
        const cookies = req.headers.cookie.split('; ');
        const cookieRec: Record<string, string> = {};
        for (const cookie of cookies) {
            const cookieSegments = cookie.split('=');
            cookieRec[cookieSegments[0]] = cookieSegments[1];
        }
        return cookieRec;
    }
}

async function refreshAccessToken(
    idpRefreshToken: string,
    accessTokenId: string,
    prisma: PrismaClient,
    config: Config,
    googleOidcEndpoints: GoogleOidcEndpoints
) {
    const requestBody = new URLSearchParams({
        client_id: config.googleClientId,
        client_secret: config.googleClientSecret,
        refresh_token: idpRefreshToken,
        grant_type: 'refresh_token',
    });
    try {
        const tokenResponse = await axios.post(
            googleOidcEndpoints.tokenEndpoint,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        await prisma.accessToken.update({
            data: {
                idpAccessToken: tokenResponse.data.access_token,
                idpAccessTokenExpiresAt: new Date(
                    Date.now() + tokenResponse.data.expires_in * 1000
                ),
            },
            where: {
                id: accessTokenId,
            },
        });
    } catch (error) {
        throw new Error('Error while retrieving the refresh token.');
    }
}
