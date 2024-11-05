import { type Knex } from 'knex';

const TableName = {
    USERS: 'users',
    MESSAGES: 'messages',
    CHATS: 'chats',
    MOVIES: 'movies',
} as const;

const ColumnName = {
    ID: 'id',
    EMAIL: 'email',
    USERNAME: 'username',
    PASSWORD_HASH: 'password_hash',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',

    NAME: 'name',

    CONTENT: 'content',
    SENDER: 'sender',

    YEAR: 'year',
    POSTER_ID: 'poster_id',
    TMDB_ID: 'tmdb_id',
    DESCRIPTION: 'description',
    TYPE: 'type',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(TableName.USERS, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.EMAIL).unique().notNullable();
        table.text(ColumnName.PASSWORD_HASH).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });

    await knex.schema.createTable(TableName.CHATS, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.NAME).notNullable().defaultTo('Super chat');
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });

    await knex.schema.createTable(TableName.MESSAGES, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .enu(ColumnName.SENDER, ['user', 'assistant'], {
                useNative: true,
                enumName: 'sender',
            })
            .notNullable();
        table.string(ColumnName.CONTENT).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });

    await knex.schema.createTable(TableName.MOVIES, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.NAME).notNullable();
        table.string(ColumnName.YEAR).notNullable();
        table.string(ColumnName.POSTER_ID).notNullable();
        table.string(ColumnName.DESCRIPTION).notNullable();
        table.enu(ColumnName.TYPE, ['movie', 'series'], {
            useNative: true,
            enumName: 'content_type',
        });
        table.string(ColumnName.TMDB_ID).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(TableName.USERS);
    await knex.schema.dropTableIfExists(TableName.CHATS);
    await knex.schema.dropTableIfExists(TableName.MESSAGES);
    await knex.schema.dropTableIfExists(TableName.MOVIES);
}

export { down, up };
