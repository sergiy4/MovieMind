import { type ContextChatsMessages } from '~/common/plugins/session/types/types.js';

import { MAX_TOKENS } from '../ai-assistant/constants/constants.js';
import { type ContextMessage } from '../ai-assistant/types/types.js';
import { type TextTokenCounterService } from '../services.js';

type Constructor = {
    textTokenCounterService: TextTokenCounterService;
};

class ChatsContextManager {
    private chatMessagesMap: ContextChatsMessages;

    private textTokenCounterService: TextTokenCounterService;

    public constructor({ textTokenCounterService }: Constructor) {
        this.chatMessagesMap = {};
        this.textTokenCounterService = textTokenCounterService;
    }

    public addChat(chatId: number): void {
        this.chatMessagesMap[chatId] = [];
    }

    public deleteChat(chatId: number): void {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.chatMessagesMap[chatId];
    }

    public getChatContext(chatId: number): ContextMessage[] {
        return this.chatMessagesMap[chatId] ?? [];
    }

    public isChatEmpty(chatId: number): boolean {
        return !!this.chatMessagesMap[chatId];
    }

    public addMessages(
        messages: ContextMessage[],
        chatId: number,
    ): ContextMessage[] {
        if (this.chatMessagesMap[chatId]) {
            const updatedMessages = [
                ...(this.chatMessagesMap[chatId] as ContextMessage[]),
                ...messages,
            ];

            const newMessages = this.deleteOldMessages(updatedMessages);

            return newMessages;
        }

        return [];
    }

    private deleteOldMessages(messages: ContextMessage[]): ContextMessage[] {
        let totalTokens = this.textTokenCounterService.countTokens(messages);

        while (totalTokens > MAX_TOKENS && messages.length > 0) {
            const [removedMessage, ...rest] = messages;
            messages = rest;

            if (!removedMessage) {
                break;
            }

            totalTokens -= this.textTokenCounterService.countTokens([
                removedMessage,
            ]);
        }

        return messages;
    }
}

export { ChatsContextManager };
