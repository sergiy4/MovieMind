const UserValidationMessage = {
    EMAIL_REQUIRE: 'Email is required',
    EMAIL_WRONG: 'Please enter a valid email',
    FIELD_REQUIRE: 'Please fill out this field',
    EMAIL_INVALID: 'Please enter a valid email',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    PASSWORD_LENGTH: 'Password must have from 6 to 12 characters',
    INVALID_DATA: 'Incorrect email or password. Please try again.',
    WRONG_CREDENTIALS: 'Email or password are incorrect',
    USER_IS_NOT_AVAILABLE:
        'User with this email already exists. Log in if it is you',
} as const;

export { UserValidationMessage };
