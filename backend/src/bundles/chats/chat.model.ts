import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class ChatModel extends AbstractModel {
    public 'name': string;

    public 'userId': number;

    public static override get tableName(): string {
        return DatabaseTableName.CHATS;
    }
}

export { ChatModel };
