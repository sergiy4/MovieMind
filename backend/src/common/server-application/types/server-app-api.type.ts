import { type ControllerParameters } from './controller-parameters.type.js';

interface ServerAppApi {
    version: string;
    controllers: ControllerParameters[];
}

export { type ServerAppApi };
