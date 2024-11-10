import { HttpCode } from '~/common/enums/enums.js';

import { HttpError } from '../auth/types/types.js';
import { ChatEntity } from './chat.entity.js';
import { type ChatRepository } from './chat.repository.js';
import { ChatErrorMessage } from './enums/enums.js';
import {
    type CreateCharResponseDto,
    type CreateChatRequestDto,
    type DeleteChatRequestDto,
    type DeleteChatResponseDto,
    type GetUserChatListResponseDto,
    type UpdateChatRequestDto,
    type UpdateChatResponseDto,
} from './types/types.js';

type Constructor = {
    chatRepository: ChatRepository;
};

class ChatService {
    private chatRepository: ChatRepository;

    public constructor({ chatRepository }: Constructor) {
        this.chatRepository = chatRepository;
    }

    public async findById(id: number): Promise<ChatEntity | null> {
        return await this.chatRepository.findById(id);
    }

    public async createChat(
        data: CreateChatRequestDto & { userId: number },
    ): Promise<CreateCharResponseDto> {
        const chat = await this.chatRepository.create(
            ChatEntity.initializeNew({
                ...data,
            }),
        );

        return chat.toObject();
    }

    public async updateChat(
        id: number,
        data: UpdateChatRequestDto,
    ): Promise<UpdateChatResponseDto> {
        const updatedChat = await this.chatRepository.update(id, data);

        if (!updatedChat) {
            throw new HttpError({
                message: ChatErrorMessage.CHAT_DOESNT_EXIST,
                status: HttpCode.NOT_FOUND,
            });
        }

        return updatedChat.toObject();
    }

    public async deleteChat(
        data: DeleteChatRequestDto,
    ): Promise<DeleteChatResponseDto> {
        return {
            isDeleted: await this.chatRepository.delete(data.id),
        };
    }

    public async getCurrentUserChats(
        userId: number,
    ): Promise<GetUserChatListResponseDto> {
        const chats = await this.chatRepository.findByUserId(userId);
        return chats.map((it) => it.toObject());
    }
}

export { ChatService };
