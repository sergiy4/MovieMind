import Knex, { type Knex as TKnex } from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';

import { type Config } from '~/common/config/config.js';
import { AppEnvironment } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { DatabaseTableName } from './enums/enums.js';
import { type Database } from './types/types.js';

class BaseDatabase implements Database {
    private appConfig: Config;

    private logger: Logger;

    private knex: TKnex | null;

    public constructor(config: Config, logger: Logger) {
        this.knex = null;
        this.appConfig = config;
        this.logger = logger;
    }

    public getKnex(): TKnex {
        return this.knex as TKnex;
    }

    public connect(): ReturnType<Database['connect']> {
        this.logger.info('Establish DB connection...');

        const knex = Knex(this.environmentConfig);
        Model.knex(knex);
        this.knex = knex;
    }

    public get environmentsConfig(): Database['environmentsConfig'] {
        return {
            [AppEnvironment.DEVELOPMENT]: this.initialConfig,
            [AppEnvironment.PRODUCTION]: this.initialConfig,
        };
    }

    private get initialConfig(): TKnex.Config {
        const sslConfig =
            this.appConfig.ENV.APP.ENVIRONMENT === AppEnvironment.DEVELOPMENT
                ? null
                : { ssl: { rejectUnauthorized: false } };

        return {
            client: this.appConfig.ENV.DB.DIALECT,
            connection: {
                connectionString: this.appConfig.ENV.DB.CONNECTION_STRING,
                ...(!!sslConfig && sslConfig),
            },
            pool: {
                min: this.appConfig.ENV.DB.POOL_MIN,
                max: this.appConfig.ENV.DB.POOL_MAX,
            },
            migrations: {
                directory: 'src/migrations',
                tableName: DatabaseTableName.MIGRATIONS,
            },
            debug: false,
            ...knexSnakeCaseMappers({
                underscoreBetweenUppercaseLetters: true,
            }),
        };
    }

    private get environmentConfig(): TKnex.Config {
        return this.environmentsConfig[this.appConfig.ENV.APP.ENVIRONMENT];
    }
}

export { BaseDatabase };
export { DatabaseTableName } from './enums/enums.js';
