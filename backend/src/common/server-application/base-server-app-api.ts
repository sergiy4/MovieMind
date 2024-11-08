import {
    type ServerAppApi,
    type ServerAppRouteParameters,
} from './types/types.js';

class BaseServerAppApi implements ServerAppApi {
    public version: string;

    public routes: ServerAppRouteParameters[];

    public constructor(
        version: string,
        ...handlers: ServerAppRouteParameters[]
    ) {
        this.version = version;
        this.routes = handlers.map((it) => ({
            ...it,
            path: `/api/${this.version}${it.path}`,
        }));
    }
}

export { BaseServerAppApi };
