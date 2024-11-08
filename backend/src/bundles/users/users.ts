import { cryptService } from '~/common/services/services.js';

import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository(UserModel);
const userService = new UserService({ cryptService, userRepository });

export { userRepository, userService };
export {
    type UserGetAllResponseDto,
    type UserGetCurrentResponseDto,
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from './types/types.js';
export {
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from './validation-schemas/validation-schemas.js';
