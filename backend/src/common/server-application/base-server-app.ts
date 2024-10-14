import Fastify, { type FastifyInstance } from 'fastify';

import { type Logger } from '../logger/logger.js';
import { type ServerApp } from './types/types.js';

type Constructor = {
    logger: Logger;
};

class BaseServerApp implements ServerApp {
    private app: FastifyInstance;

    private logger: Logger;

    public constructor({ logger }: Constructor) {
        this.logger = logger;
        this.app = Fastify();
    }

    public async init(): Promise<void> {
        this.logger.info('Application initialization…');

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
