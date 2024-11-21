import { type Logger } from '~/common/logger/logger.js';

import {
    type PluginsOptions,
    type PluginWithOptions,
} from '../plugins/types/types.js';
import { type ServerAppRouteParameters } from '../server-application/types/types.js';
import {
    type ApiHandler,
    type ApiHandlerOptions,
    type Controller,
    type ControllerRouteParameters,
} from './types/types.js';

type Constructor = {
    logger: Logger;
    apiPath: string;
    isNewContext?: boolean;
};

class BaseController implements Controller {
    private logger: Logger;

    private apiUrl: string;

    public routes: ServerAppRouteParameters[];

    public isNewContext: boolean;

    public plugins: PluginsOptions;

    public constructor({ logger, apiPath, isNewContext = false }: Constructor) {
        this.logger = logger;
        this.apiUrl = apiPath;
        this.isNewContext = isNewContext;
        this.routes = [];
        this.plugins = [];
    }

    public addRoute(options: ControllerRouteParameters): void {
        const { handler, path } = options;
        const fullPath = this.apiUrl + path;

        this.routes.push({
            ...options,
            path: fullPath,
            handler: (request, reply) =>
                this.mapHandler(handler, request, reply),
        });
    }

    public addPlugin<T>(pluginData: PluginWithOptions<T>): void {
        const { plugin, options } = pluginData;

        this.plugins.push({
            plugin,
            options,
        });
    }

    private async mapHandler(
        handler: ApiHandler,
        request: Parameters<ServerAppRouteParameters['handler']>[0],
        reply: Parameters<ServerAppRouteParameters['handler']>[1],
    ): Promise<void> {
        this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

        const handlerOptions = this.mapRequest(request);
        const { status, payload } = await handler(handlerOptions);

        return await reply.status(status).send(payload);
    }

    private mapRequest(
        request: Parameters<ServerAppRouteParameters['handler']>[0],
    ): ApiHandlerOptions {
        const { body, user, params, query, session } = request;

        return {
            body,
            user,
            params,
            query,
            session,
        };
    }
}

export { BaseController };
