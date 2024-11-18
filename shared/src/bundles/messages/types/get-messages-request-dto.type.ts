import { type GetMessagesQueryRequestDto } from './get-messages-query-request-dto.type.js';

type GetMessagesRequestDto = GetMessagesQueryRequestDto & { chatId: number };

export { type GetMessagesRequestDto };
