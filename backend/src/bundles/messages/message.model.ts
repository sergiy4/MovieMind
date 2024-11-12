import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type MessageSender } from './types/types.js';

class MessageModel extends AbstractModel {
    public 'content': string;

    public 'sender': MessageSender;

    public 'chatId': number;

    public static override get tableName(): string {
        return DatabaseTableName.MESSAGES;
    }
}

export { MessageModel };
