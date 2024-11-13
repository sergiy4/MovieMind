import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { MessageModel } from '../messages/messages.js';
import { UserModel } from '../users/users.js';

class ChatModel extends AbstractModel {
    public 'name': string;

    public 'userId': number;

    public static override get tableName(): string {
        return DatabaseTableName.CHATS;
    }

    public static get relationMappings(): RelationMappings {
        return {
            user: {
                join: {
                    from: `${DatabaseTableName.CHATS}.userId`,
                    to: `${DatabaseTableName.USERS}.id`,
                },
                modelClass: UserModel,
                relation: Model.BelongsToOneRelation,
            },
            messages: {
                join: {
                    from: `${DatabaseTableName.CHATS}.id`,
                    to: `${DatabaseTableName.MESSAGES}.chatId`,
                },
                modelClass: MessageModel,
                relation: Model.HasManyRelation,
            },
        };
    }
}

export { ChatModel };
