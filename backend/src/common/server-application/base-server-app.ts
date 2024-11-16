import Fastify, {
    type FastifyError,
    type FastifyInstance,
    type FastifyReply,
    type FastifyRequest,
} from 'fastify';

import { HttpError } from '~/bundles/auth/types/types.js';
import { userService } from '~/bundles/users/users.js';

import { WHITE_ROUTES } from '../constants/constants.js';
import { type Database } from '../database/database.js';
import { HttpCode } from '../enums/enums.js';
import { type ValidationError } from '../exceptions/exceptions.js';
import { type Logger } from '../logger/logger.js';
import { authenticateJWT } from '../plugins/auth/auth-jwt.plugin.js';
import { tokenService } from '../services/services.js';
import {
    type ServerValidationErrorResponse,
    type ValidationSchema,
} from '../types/types.js';
import { ServerErrorType } from './enums/enums.js';
import {
    type ServerApp,
    type ServerAppApi,
    type ServerAppRouteParameters,
    type ServerCommonErrorResponse,
} from './types/types.js';

type Constructor = {
    logger: Logger;
    database: Database;
    apis: ServerAppApi[];
};

class BaseServerApp implements ServerApp {
    private app: FastifyInstance;

    private logger: Logger;

    private database: Database;

    private apis: ServerAppApi[];

    public constructor({ logger, apis, database }: Constructor) {
        this.logger = logger;
        this.database = database;
        this.apis = apis;
        this.app = Fastify();
    }

    public getDatabase(): Database {
        return this.database;
    }

    public addRoute(parameters: ServerAppRouteParameters): void {
        const { path, method, handler, validation } = parameters;

        this.app.route({
            url: path,
            method,
            handler,
            schema: {
                body: validation?.body,
                params: validation?.params,
            },
        });

        this.logger.info(`Route: ${method as string} ${path} is registered`);
    }

    public addRoutes(parameters: ServerAppRouteParameters[]): void {
        for (const it of parameters) {
            this.addRoute(it);
        }
    }

    public initRoutes(): void {
        const routers = this.apis.flatMap((it) => it.routes);

        this.addRoutes(routers);
    }

    private registerPlugins(): void {
        void this.app.register(authenticateJWT, {
            services: {
                tokenService,
                userService,
            },
            routesWhiteList: WHITE_ROUTES,
        });
    }

    private initValidationCompiler(): void {
        this.app.setValidatorCompiler(
            ({ schema }: { schema: ValidationSchema }) => {
                return <T, R = ReturnType<ValidationSchema['parse']>>(
                    data: T,
                ): R => {
                    return schema.parse(data) as R;
                };
            },
        );
    }

    private initErrorHandler(): void {
        this.app.setErrorHandler(
            (
                error: FastifyError | ValidationError,
                _request: FastifyRequest,
                reply: FastifyReply,
            ) => {
                if ('issues' in error) {
                    this.logger.error(`[Validation Error]: ${error.message}`);

                    for (const issue of error.issues) {
                        this.logger.error(
                            `[${issue.path.toString()}] — ${issue.message}`,
                        );
                    }

                    const response: ServerValidationErrorResponse = {
                        details: error.issues.map((issue) => ({
                            message: issue.message,
                            path: issue.path,
                        })),
                        errorType: ServerErrorType.VALIDATION,
                        message: error.message,
                    };

                    return reply
                        .status(HttpCode.UNPROCESSED_ENTITY)
                        .send(response);
                }

                if (error instanceof HttpError) {
                    this.logger.error(
                        `[Http Error]: ${error.status.toString()} – ${
                            error.message
                        }`,
                    );

                    const response: ServerCommonErrorResponse = {
                        errorType: ServerErrorType.COMMON,
                        message: error.message,
                    };

                    return reply.status(error.status).send(response);
                }

                this.logger.error(error.message);

                const response: ServerCommonErrorResponse = {
                    errorType: ServerErrorType.COMMON,
                    message: error.message,
                };

                return reply
                    .status(HttpCode.INTERNAL_SERVER_ERROR)
                    .send(response);
            },
        );
    }

    public async init(): Promise<void> {
        this.logger.info('Application initialization…');

        this.registerPlugins();

        this.initValidationCompiler();

        this.initErrorHandler();

        this.initRoutes();

        this.database.connect();

        await this.app
            .listen({
                port: 3000,
            })
            .catch((error: Error) => {
                this.logger.error(error.message, {
                    cause: error.cause,
                    stack: error.stack,
                });
            });

        this.logger.info('Application is listening on PORT – 3000');
    }
}

export { BaseServerApp };
