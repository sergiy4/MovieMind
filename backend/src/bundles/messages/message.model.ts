import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { ChatModel } from '../chats/chats.js';
import { MovieModel } from '../movies/movies.js';
import { type MessageSender } from './types/types.js';

class MessageModel extends AbstractModel {
    public 'content': string;

    public 'sender': MessageSender;

    public 'chatId': number;

    public static override get tableName(): string {
        return DatabaseTableName.MESSAGES;
    }

    public static get relationMappings(): RelationMappings {
        return {
            chat: {
                join: {
                    from: `${DatabaseTableName.MESSAGES}.chatId`,
                    to: `${DatabaseTableName.CHATS}.id`,
                },
                modelClass: ChatModel,
                relation: Model.BelongsToOneRelation,
            },
            movies: {
                join: {
                    from: `${DatabaseTableName.MESSAGES}.id`,
                    through: {
                        from: `${DatabaseTableName.MESSAGES_TO_MOVIES}.messageId`,
                        to: `${DatabaseTableName.MESSAGES_TO_MOVIES}.movieId`,
                    },
                    to: `${DatabaseTableName.MOVIES}.id`,
                },
                modelClass: MovieModel,
                relation: Model.ManyToManyRelation,
            },
        };
    }
}

export { MessageModel };
