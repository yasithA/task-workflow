import axios from 'axios';

/**
 * OIDC Endpoints
 */
export interface GoogleOidcEndpoints {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    userInfoEndpoint: string;
}

/**
 * Retrieve OIDC Endpoints from Google OIDC Discovery Document
 *
 * @param googleOidcDiscoveryDocument
 * @returns
 */
export async function getGoogleOidcEndpoints(
    googleOidcDiscoveryDocument: string
): Promise<GoogleOidcEndpoints> {
    try {
        const googleOidcConfigResponse = (
            await axios.get(googleOidcDiscoveryDocument)
        ).data;
        return {
            authorizationEndpoint:
                googleOidcConfigResponse.authorization_endpoint,
            tokenEndpoint: googleOidcConfigResponse.token_endpoint,
            userInfoEndpoint: googleOidcConfigResponse.userinfo_endpoint,
        };
    } catch (error) {
        throw new Error(
            'Cannot retrieve information from Google OIDC Discovery Document.'
        );
    }
}
