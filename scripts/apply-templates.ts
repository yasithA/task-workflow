import { createReadStream, createWriteStream } from 'fs';
import { readdir } from 'fs/promises';

/**
 * Iterate through all directories starting from a given path,
 * and find any files ending with `.env.template` extension.
 * If any file is found, a new file is created as `.env` extension in the same
 * folder with the content in `.env.template`.
 */
const applyTemplates = async (path: string) => {
    try {
        const openedDir = await readdir(path, {
            withFileTypes: true,
        });

        for (const file of openedDir) {
            if (file.name.endsWith('.env.template')) {
                const readStream = createReadStream(`${path}/${file.name}`);
                const writeStream = createWriteStream(`${path}/.env`);
                readStream.pipe(writeStream);
            } else if (file.isDirectory()) {
                applyTemplates(path.concat('/').concat(file.name));
            }
        }
    } catch (error) {
        console.error('Error occurred while applying templates.', error);
    }
};

// Create .env files from .env.template file
applyTemplates('./task-workflow-infra');
applyTemplates('./services');
applyTemplates('./packages');
