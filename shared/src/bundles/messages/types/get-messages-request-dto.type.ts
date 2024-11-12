import { type GetMessagesBodyRequestDto } from './get-messages-body-request-dto.type.js';

type GetMessagesRequestDto = GetMessagesBodyRequestDto & { chatId: number };

export { type GetMessagesRequestDto };
