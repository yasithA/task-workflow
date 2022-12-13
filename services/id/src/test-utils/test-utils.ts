import { PrismaClient } from '@prisma/client';

export function getPrismaClient(testFileName: string): PrismaClient {
    return new PrismaClient({
        datasources: {
            db: {
                url: getDatabaseUrl(testFileName),
            },
        },
    });
}

function getDatabaseUrl(fileName: string): string {
    const databaseName = fileName.split('.db.test.ts')[0];
    return `postgresql://id_service_owner:id_service_owner_password@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.DATABASE_NAME}_test_${databaseName}?schema=app_public`;
}
