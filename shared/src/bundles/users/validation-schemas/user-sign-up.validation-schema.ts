import { z } from 'zod';

import { UserValidationMessage, UserValidationRule } from '../enums/enums.js';

type UserSignUpRequestValidationDto = {
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
};

const userSignUp = z.object<UserSignUpRequestValidationDto>({
    username: z
        .string({ required_error: UserValidationMessage.FIELD_REQUIRE })
        .trim(),
    email: z
        .string({ required_error: UserValidationMessage.FIELD_REQUIRE })
        .trim()
        .min(UserValidationRule.EMAIL_MINIMUM_LENGTH, {
            message: UserValidationMessage.EMAIL_WRONG,
        })
        .max(UserValidationRule.EMAIL_MAXIMUM_LENGTH, {
            message: UserValidationMessage.EMAIL_WRONG,
        })
        .email({
            message: UserValidationMessage.EMAIL_WRONG,
        }),
    password: z
        .string({ required_error: UserValidationMessage.FIELD_REQUIRE })
        .trim()
        .min(UserValidationRule.PASSWORD_MINIMUM_LENGTH, {
            message: UserValidationMessage.PASSWORD_LENGTH,
        })
        .max(UserValidationRule.PASSWORD_MAXIMUM_LENGTH, {
            message: UserValidationMessage.PASSWORD_LENGTH,
        }),
});

export { userSignUp };
