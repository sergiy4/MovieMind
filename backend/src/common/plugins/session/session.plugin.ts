import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fp from 'fastify-plugin';

import { type BaseConfig } from '~/common/config/base-config.package.js';
import {
    type TextTokenCounterService,
    ChatsContextManager,
} from '~/common/services/services.js';

import { Hook } from './enums/enums.js';

type Options = {
    services: {
        config: BaseConfig;
        textTokenCounterService: TextTokenCounterService;
    };
};

const session = fp<Options>(async (fastify, { services }): Promise<void> => {
    await fastify.register(fastifyCookie);
    await fastify.register(fastifySession, {
        secret: services.config.ENV.SESSION.SESSION_KEY,
        cookie: { secure: false },
    });

    fastify.addHook(Hook.ON_REQUEST, (request, _replay, done) => {
        const { textTokenCounterService } = services;

        if (!request.session.chatsContextManager) {
            request.session.chatsContextManager = new ChatsContextManager({
                textTokenCounterService,
            });
        }

        done();
    });
});

export { type Options as SessionOptions, session };
