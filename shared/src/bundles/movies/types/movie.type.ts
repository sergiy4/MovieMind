import { type ContentType } from './content-type.type.js';

type Movie = {
    id: number;
    name: string;
    year: string;
    posterUrl: string;
    description: string;
    tmdbId: string;
    type: ContentType;
};

export { type Movie };
