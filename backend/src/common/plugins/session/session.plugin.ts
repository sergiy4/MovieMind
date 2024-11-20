import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fp from 'fastify-plugin';

import { type BaseConfig } from '~/common/config/base-config.package.js';

import { Hook } from './enums/enums.js';

type Options = {
    services: {
        config: BaseConfig;
    };
};

const session = fp<Options>(async (fastify, { services }): Promise<void> => {
    await fastify.register(fastifyCookie);
    await fastify.register(fastifySession, {
        secret: services.config.ENV.SESSION.SESSION_KEY,
        cookie: { secure: false },
    });

    fastify.addHook(Hook.ON_REQUEST, (request, _replay, done) => {
        if (!request.session.chats) {
            request.session.chats = {};
        }

        done();
    });
});

export { type Options as SessionOptions,session };
