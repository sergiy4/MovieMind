import { type ServerAppRouteParameters } from './types.js';

interface ServerAppApi {
    version: string;
    routes: ServerAppRouteParameters[];
}

export { type ServerAppApi };
