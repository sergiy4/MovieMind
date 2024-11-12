import { type Repository } from '~/common/types/repository.type.js';

import { MessageEntity } from './message.entity.js';
import { type MessageModel } from './message.model.js';
import { type GetMessagesRequestDto } from './types/types.js';

class MessageRepository implements Repository {
    private messageModel: typeof MessageModel;

    public constructor(messageModel: typeof MessageModel) {
        this.messageModel = messageModel;
    }

    public async findById(id: number): Promise<MessageEntity | null> {
        const user = await this.messageModel.query().findById(id).execute();

        return user ? MessageEntity.initialize(user) : null;
    }

    public async findAll(): Promise<MessageEntity[]> {
        const users = await this.messageModel.query().execute();

        return users.map((it) => MessageEntity.initialize(it));
    }

    public async findByChatId(
        data: GetMessagesRequestDto,
    ): Promise<MessageEntity[]> {
        const { chatId, limit, offset } = data;
        const chats = await this.messageModel
            .query()
            .where('chatId', chatId)
            .offset(offset)
            .limit(limit)
            .execute();

        return chats.map((it) => MessageEntity.initialize(it));
    }

    public async create(entity: MessageEntity): Promise<MessageEntity> {
        const { chatId, content, sender } = entity.toNewObject();

        const message = await this.messageModel
            .query()
            .insert({
                content,
                sender,
                chatId,
            })
            .execute();

        return MessageEntity.initialize(message);
    }

    public async createMany(
        entities: MessageEntity[],
    ): Promise<MessageEntity[]> {
        const objects = entities.map((entity) => entity.toNewObject());

        const messages = await this.messageModel
            .query()
            .insert(objects)
            .execute();

        return messages.map((item) => MessageEntity.initialize(item));
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { MessageRepository };
