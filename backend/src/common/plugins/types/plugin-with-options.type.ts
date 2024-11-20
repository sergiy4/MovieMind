import { type Plugin } from './plugin.type.js';

type PluginWithOptions<Options> = {
    plugin: Plugin;
    options?: Options;
};

type PluginsOptions = PluginWithOptions<unknown>[];

export { type PluginsOptions, type PluginWithOptions };
