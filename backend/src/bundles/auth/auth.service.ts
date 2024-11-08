import { HttpCode } from '~/common/enums/enums.js';
import { type TokenService } from '~/common/services/services.js';

import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '../users/types/types.js';
import { type UserService } from '../users/user.service.js';
import { ExceptionMessage } from './enums/enum.js';
import { HttpError } from './types/types.js';

type Constructor = {
    userService: UserService;
    tokenService: TokenService;
};
class AuthService {
    private userService: UserService;
    private tokenService: TokenService;

    public constructor({ tokenService, userService }: Constructor) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const { email } = userRequestDto;

        const emailExists = await this.userService.findByEmail(email);
        if (emailExists) {
            throw new HttpError({
                message: ExceptionMessage.EMAIL_ALREADY_EXISTS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const user = await this.userService.create(userRequestDto);
        const token = await this.tokenService.createToken(user.id.toString());

        return { ...user, token };
    }
}

export { AuthService };
