import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class UserModel extends AbstractModel {
    public 'email': string;

    public 'username': string;

    public 'passwordHash': string;

    public static override get tableName(): string {
        return DatabaseTableName.USERS;
    }
}

export { UserModel };
