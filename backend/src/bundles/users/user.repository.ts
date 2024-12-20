import { type Repository } from '~/common/types/types.js';

import { UserEntity } from './user.entity.js';
import { type UserModel } from './user.model.js';

class UserRepository implements Repository {
    private userModel: typeof UserModel;

    public constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

    public async create(entity: UserEntity): Promise<UserEntity> {
        const { email, username, passwordHash } = entity.toNewObject();

        const item = await this.userModel
            .query()
            .insert({
                email,
                username,
                passwordHash,
            })
            .returning('*')
            .execute();

        return UserEntity.initialize(item);
    }

    public async findById(id: number): Promise<UserEntity | null> {
        const user = await this.userModel.query().findById(id).execute();

        return user ? UserEntity.initialize(user) : null;
    }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.userModel.query().findOne({ email }).execute();

        return user ? UserEntity.initialize(user) : null;
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userModel.query().execute();

        return users.map((it) => UserEntity.initialize(it));
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { UserRepository };
