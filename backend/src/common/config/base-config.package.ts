import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { type Logger } from '~/common/logger/logger.js';

import { AppEnvironment } from '../enums/enums.js';
import { type Config, type EnvironmentSchema } from './types/types.js';

class BaseConfig implements Config {
    private logger: Logger;

    public ENV: EnvironmentSchema;

    public constructor(logger: Logger) {
        this.logger = logger;

        config();

        this.envSchema.load({});
        this.envSchema.validate({
            allowed: 'strict',
            output: (message) => this.logger.info(message),
        });

        this.ENV = this.envSchema.getProperties();
        this.logger.info('.env file found and successfully parsed!');
    }

    private get envSchema(): TConfig<EnvironmentSchema> {
        return convict<EnvironmentSchema>({
            APP: {
                ENVIRONMENT: {
                    doc: 'Application environment',
                    format: Object.values(AppEnvironment),
                    env: 'NODE_ENV',
                    default: null,
                },
                PORT: {
                    doc: 'Port for incoming connections',
                    format: Number,
                    env: 'PORT',
                    default: null,
                },
            },
            DB: {
                CONNECTION_STRING: {
                    doc: 'Database connection string',
                    format: String,
                    env: 'DB_CONNECTION_STRING',
                    default: null,
                },
                DIALECT: {
                    doc: 'Database dialect',
                    format: String,
                    env: 'DB_DIALECT',
                    default: null,
                },
                POOL_MIN: {
                    doc: 'Database pool min count',
                    format: Number,
                    env: 'DB_POOL_MIN',
                    default: null,
                },
                POOL_MAX: {
                    doc: 'Database pool max count',
                    format: Number,
                    env: 'DB_POOL_MAX',
                    default: null,
                },
            },
            TOKEN: {
                SECRET_KEY: {
                    doc: 'Secret key for token generation',
                    format: String,
                    env: 'SECRET_KEY',
                    default: null,
                },
                EXPIRATION_TIME: {
                    doc: 'Token expiration time',
                    format: String,
                    env: 'EXPIRATION_TIME',
                    default: null,
                },
            },
            AI_ASSISTANT: {
                AI_ASSISTANT_KEY: {
                    doc: 'Key for AI Assistant',
                    format: String,
                    env: 'AI_ASSISTANT_KEY',
                    default: null,
                },
            },
            SESSION: {
                SESSION_KEY: {
                    doc: 'Key for sessions',
                    format: String,
                    env: 'SESSION_KEY',
                    default: null,
                },
            },
            MOVIE_API: {
                TMDB_KEY: {
                    doc: 'Key for tmdb api',
                    format: String,
                    env: 'TMDB_KEY',
                    default: null,
                },
            },
        });
    }
}

export { BaseConfig };
