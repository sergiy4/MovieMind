import { z } from 'zod';

import { ChatValidationMessage,ChatValidationRule } from '../enums/enums.js';

type UpdateChatRequestValidationDto = {
    name: z.ZodString;
};

const updateChat = z.object<UpdateChatRequestValidationDto>({
    name: z
        .string({ required_error: ChatValidationMessage.NAME_REQUIRE })
        .trim()
        .min(ChatValidationRule.NAME_MIN_LENGTH, {
            message: ChatValidationMessage.NAME_LENGTH,
        })
        .max(ChatValidationRule.NAME_MAX_LENGTH, {
            message: ChatValidationMessage.NAME_LENGTH,
        }),
});

export { updateChat };
