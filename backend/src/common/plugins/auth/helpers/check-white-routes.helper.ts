import { type FastifyRequest } from 'fastify';

import { type Route } from '../types/types.js';

const checkIfRouteInWhiteList = (
    routesWhiteList: Route[],
    request: FastifyRequest,
): boolean => {
    return routesWhiteList.some((route) => {
        return route.path === request.url && route.method === request.method;
    });
};

export { checkIfRouteInWhiteList };
