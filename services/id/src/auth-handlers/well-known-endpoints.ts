import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getJwk, getPrivateKey } from '../common/utils';

export async function handleWellKnownEndpoints(req: Request, res: Response) {
    const prisma: PrismaClient = req.app.get('prismaClient');
    if (req.params.config === undefined) {
        const wellKnownUrl = req.url.endsWith('/')
            ? req.url.substring(0, req.url.length - 1)
            : req.url;
        res.json({
            auth: 'http://localhost:3000/auth',
            token: 'http://localhost:3000/token',
            jwks: `http://localhost:3000${wellKnownUrl}/jwks`,
        });
    } else if (req.params.config === 'jwks') {
        const privateKey = await getPrivateKey(prisma);
        const jwk = await getJwk(privateKey);

        res.json(jwk);
    }
}
