import { type CryptService } from '~/common/services/services.js';
import { type Service } from '~/common/types/types.js';

import {
    type UserGetAllResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from './types/types.js';
import { UserEntity } from './user.entity.js';
import { type UserRepository } from './user.repository.js';

type Constructor = {
    cryptService: CryptService;
    userRepository: UserRepository;
};

class UserService implements Service {
    private userRepository: UserRepository;
    private cryptService: CryptService;

    public constructor({ cryptService, userRepository }: Constructor) {
        this.cryptService = cryptService;
        this.userRepository = userRepository;
    }

    public async create(
        payload: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const { email, password, username } = payload;
        const passwordHash = this.cryptService.encryptSync(password);

        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email,
                passwordHash,
                username,
            }),
        );

        return user.toObject();
    }

    public async findAll(): Promise<UserGetAllResponseDto> {
        const items = await this.userRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async findById(id: number): Promise<UserEntity | null> {
        return await this.userRepository.findById(id);
    }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        const normalizedEmail = email.toLowerCase();
        return await this.userRepository.findByEmail(normalizedEmail);
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { UserService };
