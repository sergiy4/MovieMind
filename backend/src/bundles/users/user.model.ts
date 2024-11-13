import { type RelationMappings } from 'objection';
import { Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { ChatModel } from '../chats/chats.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'username': string;

    public 'passwordHash': string;

    public static override get tableName(): string {
        return DatabaseTableName.USERS;
    }

    public static get relationMappings(): RelationMappings {
        return {
            chats: {
                join: {
                    from: `${DatabaseTableName.USERS}.id`,
                    to: `${DatabaseTableName.CHATS}.userId`,
                },
                relation: Model.HasManyRelation,
                modelClass: ChatModel,
            },
        };
    }
}

export { UserModel };
