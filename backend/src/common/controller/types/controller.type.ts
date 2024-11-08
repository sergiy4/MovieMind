import { type ServerAppRouteParameters } from '../../server-application/types/types.js';
import { type ControllerRouteParameters } from './controller-route-parameters.type.js';

type Controller = {
    routes: ServerAppRouteParameters[];
    addRoute(options: ControllerRouteParameters): void;
};

export { type Controller };
