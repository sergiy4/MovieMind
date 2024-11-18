import { MessageEntity } from './message.entity.js';
import { type MessageRepository } from './message.repository.js';
import {
    type CreateMessageRequestDto,
    type GetMessagesRequestDto,
    type GetMessagesWithMoviesResponseDto,
    type SendMessageResponseDto,
} from './types/types.js';

type Constructor = {
    messageRepository: MessageRepository;
};

class MessageService {
    private messageRepository: MessageRepository;

    public constructor({ messageRepository }: Constructor) {
        this.messageRepository = messageRepository;
    }

    public async storeMessages(
        data: CreateMessageRequestDto[],
    ): Promise<SendMessageResponseDto[]> {
        const messages = await this.messageRepository.createMany(
            data.map((message) =>
                MessageEntity.initializeNew({
                    ...message,
                    movies: [],
                }),
            ),
        );

        return messages.map((message) => message.toObject());
    }

    public async storeMessage(
        data: CreateMessageRequestDto,
    ): Promise<SendMessageResponseDto> {
        const message = await this.messageRepository.create(
            MessageEntity.initializeNew({
                ...data,
                movies: [],
            }),
        );

        return message.toObject();
    }

    public async getByFilterWithMovies(
        data: GetMessagesRequestDto,
    ): Promise<GetMessagesWithMoviesResponseDto> {
        const messages =
            await this.messageRepository.getByFilterWithMovies(data);
        return messages.map((message) => message.toObject());
    }
}

export { MessageService };
