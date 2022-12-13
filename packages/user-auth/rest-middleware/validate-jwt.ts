import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '../common/authentication-context';
import { jwtVerify, importJWK } from 'jose';
import axios from 'axios';
import { AuthenticatedUser } from '../common';
import { JWTOptions } from '../common/jwt-options';

/**
 * Express Middleware to validate and verify the
 * bearer token in the authorization header in a request.
 *
 * @param idServiceUrl
 * @returns
 */
export function ValidateJwt(idServiceUrl: string) {
    return async (
        request: Request,
        _response: Response,
        next: NextFunction
    ) => {
        const authenticatedRequest = request as AuthenticatedRequest;
        const bearerToken =
            authenticatedRequest.headers['authorization']?.split('Bearer ')[1];

        if (bearerToken === undefined) {
            authenticatedRequest.authenticationContext = {
                error: {
                    code: 'NOT_AUTHENTICATED',
                    message: 'Not Authenticated',
                    details: 'No Bearer token found.',
                },
            };
            return next();
        }

        try {
            const resp = await axios.get(
                new URL('/.well-known/jwks', idServiceUrl).toString()
            );
            const jwks = await importJWK(resp.data, JWTOptions.ALGORITHM);
            const { payload } = await jwtVerify(bearerToken, jwks, {
                issuer: JWTOptions.ISSUER,
                audience: JWTOptions.AUDIENCE,
            });

            authenticatedRequest.authenticationContext = {
                user: payload as AuthenticatedUser,
            };
        } catch (error) {
            authenticatedRequest.authenticationContext = {
                error: {
                    code: 'NOT_AUTHENTICATED',
                    message: 'Not Authenticated',
                    details: error,
                },
            };
        }
        next();
    };
}
