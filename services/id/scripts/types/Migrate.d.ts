declare module '@prisma/migrate' {
    export declare class Migrate {
        constructor(schemaPath?: string, enabledPreviewFeatures?: string[]);
        stop(): void;
        getPrismaSchema(): string;
        reset(): Promise<void>;
        applyMigrations(): Promise<EngineResults.ApplyMigrationsOutput>;
    }
    export declare function ensureDatabaseExists(
        action: MigrateAction,
        forceCreate?: boolean,
        schemaPath?: string
    ): Promise<string | undefined>;
}
