import { type FastifyReply, type FastifyRequest } from 'fastify';

import { type HttpMethod } from '~/common/http/http.js';

type ServerAppRouteParameters = {
    path: string;
    method: HttpMethod;
    handler: (
        request: FastifyRequest,
        reply: FastifyReply,
    ) => Promise<void> | void;
};

export { type ServerAppRouteParameters };
