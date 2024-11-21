import { type UserGetCurrentResponseDto } from './bundles/users/users.ts';
import { type ChatsContextManager } from './common/services/services.ts';

declare module 'fastify' {
    interface FastifyRequest {
        user: UserGetCurrentResponseDto;
    }
}

declare module 'fastify' {
    interface Session {
        chatsContextManager: ChatsContextManager;
    }
}
