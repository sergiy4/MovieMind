import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        PORT: number;
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    };
    DB: {
        CONNECTION_STRING: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
    TOKEN: {
        SECRET_KEY: string;
        EXPIRATION_TIME: string;
    };
    AI_ASSISTANT: {
        AI_ASSISTANT_KEY: string;
    };
    SESSION: {
        SESSION_KEY: string;
    };
    MOVIE_API: {
        TMDB_KEY: string;
    };
};

export { type EnvironmentSchema };
