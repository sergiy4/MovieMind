import { type ContentType } from '~/bundles/movies/types/types.js';

type GetMovieRequest = {
    name: string;
    year: string;
    type: ContentType;
};

export { type GetMovieRequest };
