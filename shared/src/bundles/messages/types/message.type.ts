import { type MessageSender } from './message-sender.type.js';

type Message = {
    id: number;
    sender: MessageSender;
    content: string;
    chatId: number;
};

export { type Message };
