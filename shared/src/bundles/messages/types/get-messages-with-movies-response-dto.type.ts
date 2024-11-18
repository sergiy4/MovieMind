import { type Movie } from '~/bundles/movies/movies.js';

import { type Message } from './message.type.js';

type GetMessagesWithMoviesResponseDto = Array<
    Message & Record<'movies', Movie[]>
>;

export { type GetMessagesWithMoviesResponseDto };
