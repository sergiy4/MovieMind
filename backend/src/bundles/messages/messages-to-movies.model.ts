import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class MessagesToMoviesModel extends AbstractModel {
    public 'movieId': number;

    public 'messageId': number;

    public static override get tableName(): string {
        return DatabaseTableName.MESSAGES_TO_MOVIES;
    }
}

export { MessagesToMoviesModel };
