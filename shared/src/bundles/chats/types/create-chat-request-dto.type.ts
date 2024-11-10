import { type Chat } from './chat.type.js';

type CreateChatRequestDto = Omit<Chat, 'userId'>;

export { type CreateChatRequestDto };
