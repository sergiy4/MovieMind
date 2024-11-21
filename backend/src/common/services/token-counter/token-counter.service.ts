import { type Tiktoken, encoding_for_model } from 'tiktoken';

import { AI_ASSISTANT_MODEL } from '../ai-assistant/constants/constants.js';
import { type ContextMessage } from '../ai-assistant/types/types.js';

class TextTokenCounterService {
    private modelEncoding: Tiktoken;

    public constructor() {
        this.modelEncoding = encoding_for_model(AI_ASSISTANT_MODEL);
    }

    public countTokens(messages: ContextMessage[]): number {
        return messages.reduce(
            (sum, message) =>
                sum + this.modelEncoding.encode(message.content).length,
            0,
        );
    }
}

export { TextTokenCounterService };
