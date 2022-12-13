import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { AuthenticatedRequest, JWTOptions } from '../common';
import { ValidateJwt } from './validate-jwt';

describe('ValidateJwt', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const nextFunction: NextFunction = jest.fn();
    // Bearer token and related JWK generated using https://token.dev for test purposes.
    const bearerToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjcwODM1OTg1LCJleHAiOjE5NzEwNDA1ODUsImlzcyI6ImlkLXNlcnZpY2UiLCJhdWQiOiJ0YXNrLXdvcmtmbG93In0.yVRDwbkfrVjzkfBTxMzv6OErE96qpYtM3M-k_VHrdk1vBCd90rRTMF48SxWbsK_1_C12J2doL4bq0vAsI8RQA083RY15VktgcoMIDzZRjEb-dgUM0BdtXOGwJ10XQ7sg9rTrU74-Y4Y1sKPtDM3vUB1EtwbBV4UgI2dXSsgnxR7T0Vis-dr9gHA6Rukh8nDScBG_FUjKB_BoMoi1AK2ApHbs0-QTBbMeQfj6cYVDaRvccauMxDV4wnQMPoibgr8oDDkDOMzF0AcPEG_lUdXk_tpq3vvpORWvVrmeeHPGIotBpsJMo4GOSgfIWwlwgvxCRasupddJryEV5kQMQhok4w';
    const jwk = {
        kty: 'RSA',
        n: '6S7asUuzq5Q_3U9rbs-PkDVIdjgmtgWreG5qWPsC9xXZKiMV1AiV9LXyqQsAYpCqEDM3XbfmZqGb48yLhb_XqZaKgSYaC_h2DjM7lgrIQAp9902Rr8fUmLN2ivr5tnLxUUOnMOc2SQtr9dgzTONYW5Zu3PwyvAWk5D6ueIUhLtYzpcB-etoNdL3Ir2746KIy_VUsDwAM7dhrqSK8U2xFCGlau4ikOTtvzDownAMHMrfE7q1B6WZQDAQlBmxRQsyKln5DIsKv6xauNsHRgBAKctUxZG8M4QJIx3S6Aughd3RZC4Ca5Ae9fd8L8mlNYBCrQhOZ7dS0f4at4arlLcajtw',
        e: 'AQAB',
    };

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {};
    });

    it('When no bearer token is sent in the authorization headers, the error object of the request.authenticationContext is set with the correct error', async () => {
        // Arrange
        const authMiddleware = ValidateJwt('http://localhost:3000');
        mockRequest = {
            headers: {},
        };

        // Act
        await authMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(
            (mockRequest as AuthenticatedRequest).authenticationContext.error
        ).toStrictEqual({
            code: 'NOT_AUTHENTICATED',
            message: 'Not Authenticated',
            details: 'No Bearer token found.',
        });
    });

    it('When a bearer token is sent with the authorization headers, and if the token validation fails, an error object is set to request.authenticationContext', async () => {
        // Arrange
        const authMiddleware = ValidateJwt('http://localhost:3000');
        mockRequest = {
            headers: {
                authorization: `Bearer ${bearerToken}`,
            },
        };

        // Returning an invalid JWK
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: {
                kty: 'RSA',
                n: '2FQGWR0a87i4Du3JbzWMMYf54genBjQYg-PfhQdjyMzwcObHC_qP8X9Kvp99Oc9miNkU5Wi0znZ9al8SbwDPiq5uCdY87f_U86NUqtRS2b8LRSj78H4wpCYsHwWGaxBgBKGEZPt69KPmr50ujVGt0_ruo7AAKWfcBL6xiVU-Ft2i4QA7HjRsTeOgDDqgi1LyG0abFMKpPav07f-8yJXtitykyC_G2QgWkY9c_6upArPqcfOD_v034hTrMpfQZrKSOXzmY7ZJqRZvv9ilxCypKXZb2pk1qIt-hJyLSqynwzVnJ-jAFC8p2R32t9SY80nIAtnLvTHuSWEvnWPQ2g4e2w',
                e: 'AQAB',
            },
        });

        // Act
        await authMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(
            (mockRequest as AuthenticatedRequest).authenticationContext.error
        ).toBeDefined();
        expect(
            JSON.parse(
                JSON.stringify(
                    (mockRequest as AuthenticatedRequest).authenticationContext
                        .error
                )
            )
        ).toStrictEqual({
            code: 'NOT_AUTHENTICATED',
            message: 'Not Authenticated',
            details: {
                code: 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED',
                name: 'JWSSignatureVerificationFailed',
                message: 'signature verification failed',
            },
        });
    });

    it('When a bearer token is sent with the authorization headers, and if the token validation passes, the decoded jwt is attached to the request.authenticationContext.user', async () => {
        // Arrange
        const authMiddleware = ValidateJwt('http://localhost:3000');
        mockRequest = {
            headers: {
                authorization: `Bearer ${bearerToken}`,
            },
        };

        jest.spyOn(axios, 'get').mockResolvedValue({ data: jwk });

        // Act
        await authMiddleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        // Assert
        expect(
            (mockRequest as AuthenticatedRequest).authenticationContext.error
        ).toBeUndefined();
        expect(
            (mockRequest as AuthenticatedRequest).authenticationContext.user
        ).toStrictEqual({
            sub: '1234567890',
            name: 'John Doe',
            iat: 1670835985,
            exp: 1971040585,
            iss: JWTOptions.ISSUER,
            aud: JWTOptions.AUDIENCE,
        });
    });
});
