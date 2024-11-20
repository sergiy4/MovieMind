import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath, HttpCode, HTTPMethod } from '~/common/enums/enums.js';
import { type Logger } from '~/common/logger/logger.js';

import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '../users/types/types.js';
import {
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from '../users/users.js';
import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './enums/enum.js';

class AuthController extends BaseController {
    private authService: AuthService;

    public constructor(logger: Logger, authService: AuthService) {
        super({ logger, apiPath: ApiPath.AUTH });

        this.authService = authService;

        this.addRoute({
            path: AuthApiPath.SIGN_UP,
            method: HTTPMethod.POST,
            validation: {
                body: userSignUpValidationSchema,
            },
            handler: (options) =>
                this.signUp(
                    options as ApiHandlerOptions<{
                        body: UserSignUpRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            method: HTTPMethod.POST,
            path: AuthApiPath.SIGN_IN,
            validation: {
                body: userSignInValidationSchema,
            },
            handler: (options) =>
                this.signIn(
                    options as ApiHandlerOptions<{
                        body: UserSignInRequestDto;
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

    private async signIn(
        options: ApiHandlerOptions<{
            body: UserSignInRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.CREATED,
            payload: await this.authService.signIn(options.body),
        };
    }
}

export { AuthController };
