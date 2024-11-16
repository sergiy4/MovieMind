import { z } from 'zod';

import { MessageValidationMessage } from '../enums/enums.js';

type GetMessagesRequestQueryValidationDto = {
    offset: z.ZodNumber;
    limit: z.ZodNumber;
};

const getMessagesQuery = z.object<GetMessagesRequestQueryValidationDto>({
    limit: z
        .number({
            required_error: MessageValidationMessage.LIMIT_IS_REQUIRED,
        })
        .nonnegative(),

    offset: z
        .number({
            required_error: MessageValidationMessage.OFFSET_IS_REQUIRED,
        })
        .nonnegative(),
});

export { getMessagesQuery };
