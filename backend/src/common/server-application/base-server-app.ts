import Fastify, { type FastifyInstance } from 'fastify';

import { type ServerApp } from './types/types.js';

class BaseServerApp implements ServerApp {
    private app: FastifyInstance;

    public constructor() {
        this.app = Fastify();
    }

    public async init(): Promise<void> {
        await this.app.listen({
            port: 3000,
        });
    }
}

export { BaseServerApp };
