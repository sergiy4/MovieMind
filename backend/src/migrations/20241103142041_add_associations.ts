import { type Knex } from 'knex';

const TableName = {
    USERS: 'users',
    MESSAGES: 'messages',
    CHATS: 'chats',
    MOVIES: 'movies',
    MESSAGES_TO_MOVIES: 'messages_to_movies',
} as const;

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    CHAT_ID: 'chat_id',
    MESSAGE_ID: 'message_id',
    MOVIE_ID: 'movie_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
};

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TableName.CHATS, (table) => {
        table
            .integer(ColumnName.USER_ID)
            .references(ColumnName.ID)
            .inTable(TableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
    });

    await knex.schema.alterTable(TableName.MESSAGES, (table) => {
        table
            .integer(ColumnName.CHAT_ID)
            .references(ColumnName.ID)
            .inTable(TableName.CHATS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
    });

    await knex.schema.createTable(TableName.MESSAGES_TO_MOVIES, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.MESSAGE_ID)
            .references(ColumnName.ID)
            .inTable(TableName.MESSAGES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table
            .integer(ColumnName.MOVIE_ID)
            .references(ColumnName.ID)
            .inTable(TableName.MOVIES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table.unique([ColumnName.MESSAGE_ID, ColumnName.MOVIE_ID]);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TableName.CHATS, (table) => {
        table.dropColumn(ColumnName.USER_ID);
    });
    await knex.schema.alterTable(TableName.MESSAGES, (table) => {
        table.dropColumn(ColumnName.CHAT_ID);
        table.dropColumn(ColumnName.USER_ID);
    });
    await knex.schema.dropTableIfExists(TableName.MESSAGES_TO_MOVIES);
}

export { down, up };
