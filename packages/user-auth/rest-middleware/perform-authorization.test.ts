import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest } from '../common';
import { PerformAuthorization } from './perform-authorization';

describe('PerformAuthorization', () => {
    let mockRequest: Partial<AuthenticatedRequest>;
    let mockResponse: Partial<Response>;
    const nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn(),
            send: jest.fn(),
        };
        // Make function chainable
        mockResponse.status = jest.fn().mockReturnValue(mockResponse);
    });

    it('When the error property in user.authenticationContext is defined, a NOT_AUTHENTICATED response is returned with status 403', async () => {
        // Arrange
        mockRequest = {
            authenticationContext: {
                error: {
                    code: 'NOT_AUTHENTICATED',
                    message: 'Not Authenticated',
                    details: {
                        code: 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED',
                        name: 'JWSSignatureVerificationFailed',
                        message: 'signature verification failed',
                    },
                },
            },
        };
        const authorizationMiddleware = PerformAuthorization(['ADMIN']);

        // Act
        authorizationMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(mockResponse.status).toBeCalledWith(403);
        expect(mockResponse.send).toBeCalledWith(
            mockRequest.authenticationContext?.error
        );
    });

    it('When request.authenticationContext has no errors, but if the user object does not have the required roles, a 401 unauthorized response is given', async () => {
        // Arrange
        mockRequest = {
            authenticationContext: {
                user: {
                    email: 'jonas@sicmundus.time',
                    id: '1234567',
                    name: 'Jonas Khanwald',
                    roles: ['END_USER'],
                },
            },
        };

        const authorizationMiddleware = PerformAuthorization(['ADMIN']);

        // Act
        authorizationMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(mockResponse.status).toBeCalledWith(401);
        expect(mockResponse.send).toBeCalledWith({
            code: 'NOT_AUTHORIZED',
            message:
                'The user is not authorized to perform this operation. It requires one of the following user roles: [ADMIN].',
        });
    });

    it('When request.authenticationContext has no errors, and the user object have the required roles, no errors are given in the response', async () => {
        // Arrange
        mockRequest = {
            authenticationContext: {
                user: {
                    email: 'jonas@sicmundus.time',
                    id: '1234567',
                    name: 'Jonas Khanwald',
                    roles: ['END_USER'],
                },
            },
        };

        const authorizationMiddleware = PerformAuthorization(['END_USER']);

        // Act
        authorizationMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(mockResponse.status).not.toBeCalledWith(401);
    });
});
