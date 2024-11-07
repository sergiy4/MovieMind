import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath, HttpCode, HTTPMethod } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import { type UserSignUpRequestDto } from '../users/types/types.js';
import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './enums/enum.js';

class AuthController extends BaseController {
    private authService: AuthService;

    public constructor(logger: Logger, authService: AuthService) {
        super(logger, ApiPath.AUTH);

        this.authService = authService;

        this.addRoute({
            path: AuthApiPath.SIGN_UP,
            method: HTTPMethod.POST,
            handler: (options) =>
                this.signUp(
                    options as ApiHandlerOptions<{
                        body: UserSignUpRequestDto;
                    }>,
                ),
        });
    }

    private async signUp(
        options: ApiHandlerOptions<{
            body: UserSignUpRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.authService.signUp(options.body),
        };
    }
}

export { AuthController };
