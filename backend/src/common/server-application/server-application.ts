import { logger } from '../logger/logger.js';
import { BaseServerApp } from './base-server-app.js';

const serverApp = new BaseServerApp({ logger });

export { serverApp };
