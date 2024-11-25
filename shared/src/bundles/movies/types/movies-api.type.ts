import { type ContentType } from './content-type.type.js';

type MovieApiResponse = {
    page: number;
    results: MovieApiContent[];
    total_pages: number;
    total_results: number;
    type: ContentType;
};

type MovieApiContent = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: string[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date?: string;
    release_date?: string;
    name?: string;
    title?: string;
    vote_average: number;
    vote_count: number;
};

export { type MovieApiContent,type MovieApiResponse };
