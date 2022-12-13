import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '../common/authentication-context';

/**
 * Express middleware to perform authorization on a http request.
 * It checks if the request invoker has the required role(s) to
 * access a given endpoint.
 *
 * @param userRoles
 * @returns
 */
export function PerformAuthorization(userRoles: string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        const authenticationContext = (request as AuthenticatedRequest)
            .authenticationContext;
        if (authenticationContext.error !== undefined) {
            return response.status(403).send(authenticationContext.error);
        }
        // This branch should not be executed. If it is, something is terribly wrong.
        if (authenticationContext.user === undefined) {
            return response.status(403).send({
                code: 'NOT_AUTHENTICATED',
                message:
                    'Unknown authorization flow error. Please contact support.',
            });
        }

        if (
            !userRoles.some((value) =>
                authenticationContext.user?.roles.includes(value)
            )
        ) {
            return response.status(401).send({
                code: 'NOT_AUTHORIZED',
                message: `The user is not authorized to perform this operation. It requires one of the following user roles: [${userRoles.join(
                    ','
                )}].`,
            });
        }
        next();
    };
}
