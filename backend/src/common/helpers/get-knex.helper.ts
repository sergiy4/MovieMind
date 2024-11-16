import { type Knex } from 'knex';

import { serverApp } from '../server-application/server-application.js';

const getKnex = (): Knex => {
    return serverApp.getDatabase().getKnex();
};

export { getKnex };
