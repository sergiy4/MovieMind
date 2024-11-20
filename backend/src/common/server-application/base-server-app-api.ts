import { type ControllerParameters } from './types/controller-parameters.type.js';
import { type ServerAppApi } from './types/types.js';

class BaseServerAppApi implements ServerAppApi {
    public version: string;

    public controllers: ControllerParameters[];

    public constructor(version: string, controllers: ControllerParameters[]) {
        this.version = version;
        this.controllers = controllers.map((controller) => {
            return {
                ...controller,
                routes: (controller.routes = controller.routes.map((it) => ({
                    ...it,
                    path: `/api/${this.version}${it.path}`,
                }))),
            };
        });
    }
}

export { BaseServerAppApi };
