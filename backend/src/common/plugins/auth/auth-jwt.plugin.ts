import fp from 'fastify-plugin';

import { HttpError } from '~/bundles/auth/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { HttpCode, HttpHeader } from '~/common/enums/enums.js';
import { type TokenService } from '~/common/services/services.js';

import { ErrorMessage, Hook } from './enums/enums.js';
import { checkIfRouteInWhiteList } from './helpers/helpers.js';
import { type Route } from './types/types.js';

type Options = {
    routesWhiteList: Route[];
    services: {
        tokenService: TokenService;
        userService: UserService;
    };
};

const authenticateJWT = fp<Options>(
    (fastify, { routesWhiteList, services }, done): void => {
        // @ts-expect-error: User should be null before initialization
        fastify.decorateRequest('user', null);

        fastify.addHook(Hook.PRE_HANDLER, async (request): Promise<void> => {
            if (checkIfRouteInWhiteList(routesWhiteList, request)) {
                return;
            }

            const authHeader = request.headers[HttpHeader.AUTHORIZATION];

            if (!authHeader) {
                throw new HttpError({
                    message: ErrorMessage.MISSING_TOKEN,
                    status: HttpCode.UNAUTHORIZED,
                });
            }

            const [, token] = authHeader.split(' ');

            const { tokenService, userService } = services;
            const userId = await tokenService.getIdFromToken(token as string);

            if (!userId) {
                throw new HttpError({
                    message: ErrorMessage.INVALID_TOKEN,
                    status: HttpCode.UNAUTHORIZED,
                });
            }

            const user = await userService.findById(Number(userId));

            if (!user) {
                throw new HttpError({
                    message: ErrorMessage.MISSING_USER,
                    status: HttpCode.BAD_REQUEST,
                });
            }
            request.user = user.toObject();
        });

        done();
    },
);

export { authenticateJWT };
