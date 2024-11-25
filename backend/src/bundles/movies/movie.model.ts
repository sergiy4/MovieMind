import { type RelationMappings, Model } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { MessageModel } from '../messages/messages.js';
import { MessagesToMoviesModel } from '../messages/messages-to-movies.model.js';
import { type ContentType } from './types/types.js';

class MovieModel extends AbstractModel {
    public 'name': string;

    public 'year': string;

    public 'posterUrl': string;

    public 'description': string;

    public 'tmdbId': number;

    public 'type': ContentType;

    public static override get tableName(): string {
        return DatabaseTableName.MOVIES;
    }

    public static get relationMappings(): RelationMappings {
        return {
            messages: {
                join: {
                    from: `${DatabaseTableName.MOVIES}.id`,
                    through: {
                        from: `${DatabaseTableName.MESSAGES_TO_MOVIES}.movieId`,
                        to: `${DatabaseTableName.MESSAGES_TO_MOVIES}.messageId`,
                        modelClass: MessagesToMoviesModel,
                    },
                    to: `${DatabaseTableName.MESSAGES}.id`,
                },
                modelClass: MessageModel,
                relation: Model.ManyToManyRelation,
            },
        };
    }
}

export { MovieModel };
