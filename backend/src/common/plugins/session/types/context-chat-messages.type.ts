import { type ContextMessage } from '~/common/services/ai-assistant/types/context-message.type.js';

type ContextChatsMessages = {
    [key: number]: ContextMessage[];
};

export { type ContextChatsMessages };
