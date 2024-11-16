const MessageValidationMessage = {
    CONTENT_REQUIRE: 'Message is required',
    CONTENT_LENGTH: 'Message must have from 1 to 1000 characters',
    OFFSET_IS_REQUIRED: 'Offset is required',
    LIMIT_IS_REQUIRED: 'Limit is required',
} as const;

export { MessageValidationMessage };
