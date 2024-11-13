import { ChatController } from './chat.controller.js';
import { ChatModel } from './chat.model.js';
import { ChatRepository } from './chat.repository.js';
import { ChatService } from './chat.service.js';

const chatRepository = new ChatRepository(ChatModel);
const chatService = new ChatService({ chatRepository });
const chatController = new ChatController({ chatService });

export { chatController, chatService };
export { ChatModel } from './chat.model.js';
export { ChatApiPath, ChatErrorMessage } from './enums/enums.js';
export {
    type Chat,
    type CreateCharResponseDto,
    type CreateChatRequestDto,
    type DeleteChatRequestDto,
    type DeleteChatResponseDto,
    type GetCurrentChatRequestDto,
    type GetUserChatListResponseDto,
    type UpdateChatRequestDto,
    type UpdateChatResponseDto,
} from './types/types.js';