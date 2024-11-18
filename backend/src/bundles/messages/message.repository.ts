import { RelationName } from '~/common/enums/enums.js';
import { type Repository } from '~/common/types/repository.type.js';

import { MovieEntity } from '../movies/movie.entity.js';
import { MessageEntity } from './message.entity.js';
import { type MessageModel } from './message.model.js';
import { type GetMessagesRequestDto } from './types/types.js';

class MessageRepository implements Repository {
    private messageModel: typeof MessageModel;

    public constructor(messageModel: typeof MessageModel) {
        this.messageModel = messageModel;
    }

    public async findById(id: number): Promise<MessageEntity | null> {
        const message = await this.messageModel.query().findById(id).execute();

        return message
            ? MessageEntity.initialize({
                  ...message,
                  movies: [],
              })
            : null;
    }

    public async findAll(): Promise<MessageEntity[]> {
        const messages = await this.messageModel.query().execute();

        return messages.map((it) =>
            MessageEntity.initialize({
                ...it,
                movies: [],
            }),
        );
    }

    public async getByFilterWithMovies(
        data: GetMessagesRequestDto,
    ): Promise<MessageEntity[]> {
        const { chatId, limit, lastMessageId } = data;

        const messagesWithMovies = await this.messageModel
            .query()
            .where('chatId', chatId)
            .andWhere('id', '<', lastMessageId)
            .withGraphFetched(RelationName.MOVIES)
            .orderBy('created_at', 'desc')
            .limit(limit)
            .execute();

        return messagesWithMovies.map((it) =>
            MessageEntity.initialize({
                ...it,
                movies: it.movies.map((movie) => MovieEntity.initialize(movie)),
            }),
        );
        //
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

        return MessageEntity.initialize({ ...message, movies: [] });
    }

    public async createMany(
        entities: MessageEntity[],
    ): Promise<MessageEntity[]> {
        const objects = entities.map((entity) => entity.toNewObject());

        const messages = await this.messageModel
            .query()
            .insert(objects)
            .execute();

        return messages.map((item) =>
            MessageEntity.initialize({
                ...item,
                movies: [],
            }),
        );
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { MessageRepository };
