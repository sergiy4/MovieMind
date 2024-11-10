import { type Entity } from '~/common/types/types.js';

class ChatEntity implements Entity {
    private 'id': number | null;
    private 'userId': number;
    private 'name': string;

    private constructor({
        id,
        userId,
        name,
    }: {
        id: number | null;
        userId: number;
        name: string;
    }) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }

    public static initialize({
        id,
        userId,
        name,
    }: {
        id: number | null;
        userId: number;
        name: string;
    }): ChatEntity {
        return new ChatEntity({
            id,
            name,
            userId,
        });
    }

    public static initializeNew({
        userId,
        name,
    }: {
        userId: number;
        name: string;
    }): ChatEntity {
        return new ChatEntity({
            id: null,
            name,
            userId,
        });
    }

    public toObject(): {
        id: number;
        userId: number;
        name: string;
    } {
        return {
            id: this.id as number,
            name: this.name,
            userId: this.userId,
        };
    }

    public toNewObject(): {
        userId: number;
        name: string;
    } {
        return {
            name: this.name,
            userId: this.userId,
        };
    }
}

export { ChatEntity };
