import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { Config, AppContextKeys } from '../common/config';

export async function handleAuthCallback(req: Request, res: Response) {
    try {
        const config: Config = req.app.get(AppContextKeys.config);
        const prisma: PrismaClient = req.app.get(AppContextKeys.prismaClient);
        const { tokenEndpoint, userInfoEndpoint } = req.app.get(
            AppContextKeys.googleOidcEndpoints
        );

        const params = req.query;
        const authContext = await prisma.authContext.findFirst({
            where: {
                state: String(params.state),
            },
        });

        if (authContext === null) {
            res.status(400).send({
                message: 'Invalid Auth State. Cannot Authenticate.',
                details: {
                    state: params.state,
                },
            });
            return;
        }

        const requestBody = new URLSearchParams({
            client_id: config.googleClientId,
            client_secret: config.googleClientSecret,
            code: String(params.code),
            code_verifier: authContext.challenge,
            grant_type: 'authorization_code',
            redirect_uri: encodeURI(
                `http://localhost:${config.port}/auth-callback`
            ),
        });

        const tokenResponse = await axios.post(tokenEndpoint, requestBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const userInfo = await axios.get(userInfoEndpoint, {
            headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`,
            },
        });

        let user = await prisma.user.findFirst({
            where: {
                email: userInfo.data.email,
            },
        });
        if (user === null) {
            user = await prisma.user.create({
                data: {
                    email: userInfo.data.email,
                    name:
                        userInfo.data.name ??
                        String(userInfo.data.email).substring(
                            0,
                            String(userInfo.data.email).indexOf('@')
                        ),
                    profilePicture: userInfo.data.picture,
                },
            });
        }

        const iamToken = randomBytes(32).toString('base64');
        const iamTokenExpiresIn = 3600 * 1000 * 24 * 30;

        await prisma.accessToken.create({
            data: {
                userId: user.id,
                idpRefreshToken: tokenResponse.data.refresh_token,
                idpAccessTokenExpiresAt: new Date(
                    Date.now() + tokenResponse.data.expires_in * 1000
                ),
                iamTokenExpiresAt: new Date(Date.now() + iamTokenExpiresIn),
                idpAccessToken: tokenResponse.data.access_token,
                iamToken,
            },
        });

        await prisma.authContext.delete({
            where: {
                state: String(params.state),
            },
        });
        res.cookie('IAM_TOKEN', iamToken, {
            maxAge: iamTokenExpiresIn,
            httpOnly: true,
        });
        res.redirect(authContext.originUrl);
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            message: 'Error occurred while authenticating',
            error,
        });
    }
}
