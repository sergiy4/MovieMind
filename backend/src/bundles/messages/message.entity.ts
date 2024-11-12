import { type Entity } from '~/common/types/types.js';

import { type MessageSender } from './types/types.js';

class MessageEntity implements Entity {
    private 'id': number | null;

    private 'sender': MessageSender;

    private 'content': string;

    private 'chatId': number;

    private constructor({
        id,
        sender,
        content,
        chatId,
    }: {
        id: number | null;
        sender: MessageSender;
        content: string;
        chatId: number;
    }) {
        this.id = id;
        this.sender = sender;
        this.content = content;
        this.chatId = chatId;
    }

    public static initialize({
        id,
        sender,
        content,
        chatId,
    }: {
        id: number | null;
        sender: MessageSender;
        content: string;
        chatId: number;
    }): MessageEntity {
        return new MessageEntity({
            id,
            sender,
            content,
            chatId,
        });
    }

    public static initializeNew({
        sender,
        content,
        chatId,
    }: {
        sender: MessageSender;
        content: string;
        chatId: number;
    }): MessageEntity {
        return new MessageEntity({
            id: null,
            sender,
            content,
            chatId,
        });
    }

    public toObject(): {
        id: number;
        sender: MessageSender;
        content: string;
        chatId: number;
    } {
        return {
            id: this.id as number,
            sender: this.sender,
            content: this.content,
            chatId: this.chatId,
        };
    }

    public toNewObject(): {
        sender: MessageSender;
        content: string;
        chatId: number;
    } {
        return {
            content: this.content,
            sender: this.sender,
            chatId: this.chatId,
        };
    }
}

export { MessageEntity };
