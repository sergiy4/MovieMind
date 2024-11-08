const ExceptionMessage = {
    UNKNOWN_ERROR: 'Unknown error occurred.',
    EMAIL_ALREADY_EXISTS: 'Email is already taken.',
    INCORRECT_EMAIL: 'Incorrect email.',
    INVALID_TOKEN: 'Token is invalid.',
    PASSWORDS_NOT_MATCH: 'Passwords do not match.',
    USER_WITH_EMAIL_NOT_FOUND: 'User with this email not found.',
    USER_NOT_FOUND: 'Failed user found.',
    FORBIDDEN: 'Forbidden',
    WRONG_CREDENTIALS: 'Email or password are incorrect',
} as const;

export { ExceptionMessage };
