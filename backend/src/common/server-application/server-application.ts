import { authController } from '~/bundles/auth/auth.js';
import { chatController } from '~/bundles/chats/chats.js';

import { database } from '../database/database.js';
import { logger } from '../logger/logger.js';
import { BaseServerApp } from './base-server-app.js';
import { BaseServerAppApi } from './base-server-app-api.js';

const apiV1 = new BaseServerAppApi('v1', [authController, chatController]);

const serverApp = new BaseServerApp({ logger, apis: [apiV1], database });

export { serverApp };
