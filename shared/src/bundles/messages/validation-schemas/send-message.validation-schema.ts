import { z } from 'zod';

import {
    MessageValidationMessage,
    MessageValidationRule,
} from '../enums/enums.js';

type SendMessageRequestValidationDto = {
    content: z.ZodString;
};

const sendMessage = z.object<SendMessageRequestValidationDto>({
    content: z
        .string({ required_error: MessageValidationMessage.CONTENT_REQUIRE })
        .trim()
        .min(MessageValidationRule.CONTENT_MIN_LENGTH, {
            message: MessageValidationMessage.CONTENT_LENGTH,
        })
        .max(MessageValidationRule.CONTENT_MAX_LENGTH, {
            message: MessageValidationMessage.CONTENT_LENGTH,
        }),
});

export { sendMessage };
