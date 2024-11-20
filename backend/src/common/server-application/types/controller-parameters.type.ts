import { type PluginsOptions } from '~/common/plugins/types/types.js';

import { type ServerAppRouteParameters } from './types.js';

type ControllerParameters = {
    routes: ServerAppRouteParameters[];
    isNewContext: boolean;
    plugins?: PluginsOptions;
};

export { type ControllerParameters };
