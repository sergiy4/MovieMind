import { type ValueOf } from '~/common/types/types.js';

import { type AiAssistantRole } from '../enums/enums.js';

type ContextMessage = {
    role: ValueOf<typeof AiAssistantRole>;
    content: string;
};

export { type ContextMessage };
