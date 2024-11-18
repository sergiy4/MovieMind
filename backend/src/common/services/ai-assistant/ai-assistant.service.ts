import OpenAI from 'openai';

import { type BaseConfig } from '~/common/config/base-config.package.js';

import {
    AI_ASSISTANT_MODEL,
    AI_ASSISTANT_TEMPERATURE,
    MAX_TOKENS,
} from './constants/constants.js';
import { type ContextMessage } from './types/types.js';

class AiAssistant {
    private config: BaseConfig;
    private aiAssistant: OpenAI;

    public constructor(config: BaseConfig) {
        this.config = config;
        this.aiAssistant = this.initAiAssistant();
    }

    private initAiAssistant = (): OpenAI => {
        return new OpenAI({
            apiKey: this.config.ENV.AI_ASSISTANT.AI_ASSISTANT_KEY,
        });
    };

    public async generateAnswer(
        contextMessages: ContextMessage[],
    ): Promise<string> {
        const completion = await this.aiAssistant.chat.completions.create({
            messages: contextMessages,
            model: AI_ASSISTANT_MODEL,
            max_tokens: MAX_TOKENS,
            temperature: AI_ASSISTANT_TEMPERATURE,
        });

        return completion.choices[0]?.message.content || '';
    }
}

export { AiAssistant };
