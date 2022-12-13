import * as env from 'env-var';

/**
 * Config object representing the variables
 * read from the environment variables.
 */
export interface Config {
    port: number;
    dbHost: string;
    dbPort: number;
    dbName: string;
    dbSchema: string;
    dbOwner: string;
    dbUrl: string;
    googleOidcDiscoveryDocument: string;
    googleClientId: string;
    googleClientSecret: string;
}

/**
 * Get the Config object with all values.
 * @returns
 */
export function getAllConfig(): Config {
    return {
        port: env.get('PORT').required().asPortNumber(),
        dbHost: env.get('PG_HOST').required().asString(),
        dbPort: env.get('PG_PORT').required().asPortNumber(),
        dbName: env.get('DATABASE_NAME').required().asString(),
        dbSchema: env.get('DATABASE_SCHEMA').required().asString(),
        dbOwner: env.get('DATABASE_OWNER').required().asString(),
        dbUrl: env.get('DATABASE_URL').required().asString(),
        googleOidcDiscoveryDocument: env
            .get('GOOGLE_OIDC_DISCOVERY_DOCUMENT')
            .required()
            .asUrlString(),
        googleClientId: env.get('GOOGLE_CLIENT_ID').required().asString(),
        googleClientSecret: env
            .get('GOOGLE_CLIENT_SECRET')
            .required()
            .asString(),
    };
}
