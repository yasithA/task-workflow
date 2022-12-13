import { ValidateJwt, PerformAuthorization } from '@task-workflow/user-auth';
import express from 'express';
import { getTasks } from './route-handlers';

async function init() {
    const app = express();
    const port = 3001;

    app.use(ValidateJwt('http://localhost:3000'));

    app.get('/tasks', PerformAuthorization(['ADMIN']), getTasks);

    app.listen(port, () => {
        console.log(`Task Workflow Service listening on port ${port}`);
    });
}

init();
