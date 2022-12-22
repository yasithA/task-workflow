/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { Migrate } = require('@prisma/migrate');
const {
    ensureDatabaseExists,
} = require('@prisma/migrate/dist/utils/ensureDatabaseExists');
const fs = require('fs/promises');

/**
 * Create databases for each *.db.test file in the src folder and apply all migrations.
 * @param {*} path
 */
async function createTestDb(path) {
    const openedDir = await fs.readdir(path, {
        withFileTypes: true,
    });

    for (const file of openedDir) {
        if (file.name.endsWith('.db.test.ts')) {
            console.log(
                `Creating database for ${file.name} and applying migrations.`
            );

            await createPrismaSchemaAndApplyMigrations(
                file.name.split('.db.test.ts')[0].replace('-', '_')
            );
            console.log(`Done...`);
        } else if (file.isDirectory()) {
            await createTestDb(path.concat('/').concat(file.name));
        }
    }
}

/**
 * Create a Prisma Schema specific for the test database.
 * @param {*} testName
 */
async function createPrismaSchemaAndApplyMigrations(testName) {
    try {
        const schemaPath = `${process.cwd()}/prisma/test_schema.prisma`;
        let data = await fs.readFile(`${process.cwd()}/prisma/schema.prisma`, {
            encoding: 'utf8',
        });
        const testDbUrl = process.env.DATABASE_URL.replace(
            `${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.DATABASE_NAME}`,
            `${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.DATABASE_NAME}_test_${testName}`
        );
        console.log(testDbUrl);
        data = data.replace('env("DATABASE_URL")', `"${testDbUrl}"`);
        await fs.writeFile(schemaPath, data);

        await resetAndApplyMigrations(schemaPath);
        await fs.unlink(schemaPath);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Call @prisma/migrate API methods to create the database and apply migrations.
 * @param {*} schemaPath
 */
async function resetAndApplyMigrations(schemaPath) {
    console.log('resetting Migrations');
    await ensureDatabaseExists('apply', true, schemaPath);
    const migrate = new Migrate(schemaPath);
    await migrate.reset();

    const appliedMigrations = await migrate.applyMigrations();
    console.log(appliedMigrations);
    migrate.stop();
}

createTestDb(`${process.cwd()}/src`);
