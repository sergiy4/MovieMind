import { HttpCode } from '~/common/enums/enums.js';
import {
    type CryptService,
    type TokenService,
} from '~/common/services/services.js';

import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '../users/types/types.js';
import { type UserService } from '../users/user.service.js';
import { ExceptionMessage } from './enums/enum.js';
import { HttpError } from './types/types.js';

type Constructor = {
    userService: UserService;
    tokenService: TokenService;
    cryptService: CryptService;
};
class AuthService {
    private userService: UserService;
    private tokenService: TokenService;
    private cryptService: CryptService;

    public constructor({
        tokenService,
        userService,
        cryptService,
    }: Constructor) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.cryptService = cryptService;
    }

    public async signIn(
        userRequestDto: UserSignInRequestDto,
    ): Promise<UserSignInResponseDto> {
        const { email, password } = userRequestDto;

        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new HttpError({
                message: ExceptionMessage.WRONG_CREDENTIALS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const { passwordHash } = user.toNewObject();

        const isPasswordCorrect = this.cryptService.compareSyncPassword(
            password,
            passwordHash,
        );

        if (!isPasswordCorrect) {
            throw new HttpError({
                message: ExceptionMessage.WRONG_CREDENTIALS,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const userObject = user.toObject();
        const { id } = userObject;
        const token = await this.tokenService.createToken(id.toString());
        return { ...userObject, token };
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
