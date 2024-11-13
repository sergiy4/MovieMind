import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class MovieModel extends AbstractModel {
    public 'name': string;

    public 'year': string;

    public 'posterUrl': string;

    public 'description': string;

    public 'tmdbId': string;

    public static override get tableName(): string {
        return DatabaseTableName.MOVIES;
    }
}

export { MovieModel };
