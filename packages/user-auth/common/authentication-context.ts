import { Request } from 'express';
import { AuthenticatedUser } from './authenticated-user';
import { AuthenticationError } from './authentication-error';

/**
 * Represents the Authentication Context of a specific
 * http request. If the request has a bearer token in the authorization
 * headers, the decoded JWT information will be stored in the `user`
 * property after verification.
 * If any authentication errors occurred, the `error` property will hold that
 * information.
 */
export interface AuthenticationContext {
    user?: AuthenticatedUser;
    error?: AuthenticationError;
}

/**
 * The extended version of the Express Request object
 * with the additional `authenticationContext` property.
 */
export interface AuthenticatedRequest extends Request {
    authenticationContext: AuthenticationContext;
}
