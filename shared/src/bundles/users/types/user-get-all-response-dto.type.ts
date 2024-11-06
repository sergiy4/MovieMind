import { type UserGetCurrentResponseDto } from './user-get-current-response-dto.type.js';

type UserGetAllResponseDto = {
    items: UserGetCurrentResponseDto[];
};

export { type UserGetAllResponseDto };
