import { Express } from 'express';
import { handleAuth } from './auth-handlers/auth';
import { handleAuthCallback } from './auth-handlers/auth-callback';
import { handleToken } from './auth-handlers/token';
import { handleWellKnownEndpoints } from './auth-handlers/well-known-endpoints';

export function setupRoutes(app: Express) {
    app.get('/auth', handleAuth);
    app.get('/auth-callback', handleAuthCallback);
    app.get('/token', handleToken);
    app.get('/.well-known/:config?', handleWellKnownEndpoints);
    app.get('/hello', (req, res) => {
        res.send('Helloo');
    });
}
