import Fastify, {
    type FastifyError,
    type FastifyInstance,
    type FastifyReply,
    type FastifyRequest,
} from 'fastify';

import { HttpError } from '~/bundles/auth/types/types.js';

import { type Database } from '../database/database.js';
import { HttpCode } from '../enums/enums.js';
import { type Logger } from '../logger/logger.js';
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

    public addRoute(parameters: ServerAppRouteParameters): void {
        const { path, method, handler } = parameters;

        this.app.route({
            url: path,
            method,
            handler,
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

    private initErrorHandler(): void {
        this.app.setErrorHandler(
            (
                error: FastifyError,
                _request: FastifyRequest,
                reply: FastifyReply,
            ) => {
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
