import { JWTPayload } from 'jose';

/**
 * Represents the decoded Authenticated User.
 * Includes properties inhertied from a standard JWT
 * and some specific properties to task-workflow.
 */
export interface AuthenticatedUser extends JWTPayload {
    id: string;
    name: string;
    email: string;
    roles: string[];
}
