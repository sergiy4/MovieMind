import { type Repository } from '~/common/types/repository.type.js';

import { ChatEntity } from './chat.entity.js';
import { type ChatModel } from './chat.model.js';
import { type UpdateChatRequestDto } from './types/types.js';

class ChatRepository implements Repository {
    private chatModel: typeof ChatModel;

    public constructor(chatModel: typeof ChatModel) {
        this.chatModel = chatModel;
    }
    public async create(entity: ChatEntity): Promise<ChatEntity> {
        const { name, userId } = entity.toNewObject();

        const item = await this.chatModel.query().insert({
            name,
            userId,
        });

        return ChatEntity.initialize(item);
    }

    public async update(
        id: number,
        payload: UpdateChatRequestDto,
    ): Promise<ChatEntity | null> {
        const updatedItem = await this.chatModel
            .query()
            .patchAndFetchById(id, payload);

        return updatedItem ? ChatEntity.initialize(updatedItem) : null;
    }

    public async delete(id: number): Promise<boolean> {
        const numberOfDeletedRows = await this.chatModel
            .query()
            .deleteById(id)
            .execute();

        return Boolean(numberOfDeletedRows);
    }

    public async findById(id: number): Promise<ChatEntity | null> {
        const chat = await this.chatModel.query().findById(id).execute();

        return chat ? ChatEntity.initialize(chat) : null;
    }

    public async findAll(): Promise<ChatEntity[]> {
        const chats = await this.chatModel.query().execute();

        return chats.map((it) => ChatEntity.initialize(it));
    }

    public async findByUserId(userId: number): Promise<ChatEntity[]> {
        const chats = await this.chatModel
            .query()
            .where('userId', userId)
            .execute();

        return chats.map((it) => ChatEntity.initialize(it));
    }
}

export { ChatRepository };
