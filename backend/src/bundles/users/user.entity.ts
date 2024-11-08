import { type Entity } from './types/types.js';

class UserEntity implements Entity {
    private 'id': number | null;

    private 'email': string;

    private 'username': string;

    private 'passwordHash': string;

    private constructor({
        id,
        email,
        username,
        passwordHash,
    }: {
        id: number | null;
        email: string;
        username: string;
        passwordHash: string;
    }) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.passwordHash = passwordHash;
    }

    public static initialize({
        id,
        email,
        username,
        passwordHash,
    }: {
        id: number;
        email: string;
        username: string;
        passwordHash: string;
    }): UserEntity {
        return new UserEntity({
            id,
            email,
            username,
            passwordHash,
        });
    }

    public static initializeNew({
        email,
        username,
        passwordHash,
    }: {
        email: string;
        username: string;
        passwordHash: string;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email,
            username,
            passwordHash,
        });
    }

    public toObject(): {
        id: number;
        email: string;
        username: string;
    } {
        return {
            id: this.id as number,
            email: this.email,
            username: this.username,
        };
    }

    public toNewObject(): {
        email: string;
        username: string;
        passwordHash: string;
    } {
        return {
            email: this.email,
            username: this.username,
            passwordHash: this.passwordHash,
        };
    }
}

export { UserEntity };
