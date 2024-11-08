import { logger } from '~/common/logger/logger.js';
import { tokenService } from '~/common/services/services.js';

import { userService } from '../users/users.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService({ tokenService, userService });
const authController = new AuthController(logger, authService);

export { authController,authService };
