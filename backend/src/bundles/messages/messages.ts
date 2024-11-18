import { MessageModel } from './message.model.js';
import { MessageRepository } from './message.repository.js';
import { MessageService } from './message.service.js';

const messageRepository = new MessageRepository(MessageModel);
const messageService = new MessageService({ messageRepository });

export { messageService };
export { MessageApiPath } from './enums/enums.js';
export { MessageModel } from './message.model.js';
export {
    type CreateMessageRequestDto,
    type GetMessagesQueryRequestDto,
    type GetMessagesRequestDto,
    type GetMessagesResponseDto,
    type GetMessagesWithMoviesResponseDto,
    type Message,
    type MessageSender,
    type SendMessageRequestDto,
    type SendMessageResponseDto,
} from './types/types.js';
