import { type UserGetCurrentResponseDto } from './bundles/users/users.ts';
import { type ContextChatsMessages } from './common/plugins/session/types/types.ts';

declare module 'fastify' {
    interface FastifyRequest {
        user: UserGetCurrentResponseDto;
    }
}

declare module 'fastify' {
    interface Session {
        chats: ContextChatsMessages;
    }
}
