import { type UserGetCurrentResponseDto } from './bundles/users/users.ts';

declare module 'fastify' {
    interface FastifyRequest {
        user: UserGetCurrentResponseDto;
    }
}
