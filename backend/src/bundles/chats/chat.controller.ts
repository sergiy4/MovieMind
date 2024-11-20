import { config } from '~/common/config/config.js';
import { BaseController } from '~/common/controller/base-controller.package.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/types/types.js';
import { HttpCode, HTTPMethod } from '~/common/enums/enums.js';
import { logger } from '~/common/logger/logger.js';
import {
    type SessionOptions,
    session,
} from '~/common/plugins/session/session.plugin.js';
import { type Plugin } from '~/common/plugins/types/types.js';

import { type MessageService } from '../messages/message.service.js';
import {
    type GetMessagesQueryRequestDto,
    MessageApiPath,
} from '../messages/messages.js';
import { type UserGetCurrentResponseDto } from '../users/users.js';
import { type ChatService } from './chat.service.js';
import { ApiPath, ChatApiPath } from './enums/enums.js';
import {
    type CreateChatRequestDto,
    type GetCurrentChatRequestDto,
    type UpdateChatRequestDto,
} from './types/types.js';
import {
    createChatValidationSchema,
    updateChatValidationSchema,
} from './validation-schemas/validation-schemas.js';

type Constructor = {
    chatService: ChatService;
    messageService: MessageService;
};

class ChatController extends BaseController {
    private chatService: ChatService;
    private messageService: MessageService;

    public constructor({ chatService, messageService }: Constructor) {
        super({
            logger,
            apiPath: ApiPath.CHATS,
            isNewContext: true,
        });

        this.chatService = chatService;
        this.messageService = messageService;

        this.addPlugin<SessionOptions>({
            plugin: session as Plugin,
            options: {
                services: {
                    config,
                },
            },
        });

        this.addRoute({
            path: ChatApiPath.ROOT,
            method: HTTPMethod.GET,
            handler: (options) =>
                this.getCurrentUserChats(
                    options as ApiHandlerOptions<{
                        user: UserGetCurrentResponseDto;
                    }>,
                ),
        });

        this.addRoute({
            path: ChatApiPath.ROOT,
            method: HTTPMethod.POST,
            validation: {
                body: createChatValidationSchema,
            },
            handler: (options) =>
                this.createChat(
                    options as ApiHandlerOptions<{
                        body: CreateChatRequestDto;
                        user: UserGetCurrentResponseDto;
                    }>,
                ),
        });

        this.addRoute({
            path: ChatApiPath.ID,
            method: HTTPMethod.PATCH,
            validation: {
                body: updateChatValidationSchema,
            },
            handler: (options) =>
                this.updateChat(
                    options as ApiHandlerOptions<{
                        body: UpdateChatRequestDto;
                        params: GetCurrentChatRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: ChatApiPath.ID,
            method: HTTPMethod.DELETE,
            handler: (options) =>
                this.deleteChat(
                    options as ApiHandlerOptions<{
                        params: GetCurrentChatRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: `${ChatApiPath.ID}${MessageApiPath.ROOT}`,
            method: HTTPMethod.GET,
            handler: (options) =>
                this.getCurrentChatMessages(
                    options as ApiHandlerOptions<{
                        params: { id: number };
                        query: GetMessagesQueryRequestDto;
                    }>,
                ),
        });
    }

    private async createChat(
        options: ApiHandlerOptions<{
            body: CreateChatRequestDto;
            user: UserGetCurrentResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const chat = await this.chatService.createChat({
            ...options.body,
            userId: options.user.id,
        });

        return {
            payload: chat,
            status: HttpCode.CREATED,
        };
    }

    private async updateChat(
        options: ApiHandlerOptions<{
            body: UpdateChatRequestDto;
            params: GetCurrentChatRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            payload: await this.chatService.updateChat(
                options.params.id,
                options.body,
            ),
            status: HttpCode.OK,
        };
    }

    private async deleteChat(
        options: ApiHandlerOptions<{
            params: GetCurrentChatRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            payload: await this.chatService.deleteChat(options.params),
            status: HttpCode.OK,
        };
    }

    private async getCurrentUserChats(
        options: ApiHandlerOptions<{
            user: UserGetCurrentResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            payload: await this.chatService.getCurrentUserChats(
                options.user.id,
            ),
            status: HttpCode.OK,
        };
    }

    private async getCurrentChatMessages(
        options: ApiHandlerOptions<{
            params: { id: number };
            query: GetMessagesQueryRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        return {
            payload: await this.messageService.getByFilterWithMovies({
                ...options.query,
                chatId: options.params.id,
            }),
            status: HttpCode.OK,
        };
    }
}

export { ChatController };
