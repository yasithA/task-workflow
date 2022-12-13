/**
 * Keys that are attached to the express app
 * object to be referenced later from different
 * points in the application code.
 */
export enum AppContextKeys {
    config = 'config',
    prismaClient = 'prismaClient',
    googleOidcEndpoints = 'googleOidcEndpoints',
}
