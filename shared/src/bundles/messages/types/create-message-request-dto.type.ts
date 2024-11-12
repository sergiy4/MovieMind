import { type Message } from './message.type.js';

type CreateMessageRequestDto = Omit<Message, 'id'>;

export { type CreateMessageRequestDto };
