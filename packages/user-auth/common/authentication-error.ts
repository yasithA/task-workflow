/**
 * Represents an error occurred while authenticating a request.
 */
export interface AuthenticationError {
    code: string;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: unknown;
}
