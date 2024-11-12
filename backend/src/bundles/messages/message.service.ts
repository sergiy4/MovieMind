import { MessageEntity } from './message.entity.js';
import { type MessageRepository } from './message.repository.js';
import {
    type CreateMessageRequestDto,
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
            }),
        );

        return message.toObject();
    }
}

export { MessageService };
