import * as Bcrypt from 'bcrypt';

import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/constants.js';

class CryptService {
    private bcrypt = Bcrypt;

    public encryptSync(data: string): string {
        return this.bcrypt.hashSync(data, USER_PASSWORD_SALT_ROUNDS);
    }

    public compareSyncPassword(password: string, hash: string): boolean {
        return this.bcrypt.compareSync(password, hash);
    }
}

export { CryptService };
