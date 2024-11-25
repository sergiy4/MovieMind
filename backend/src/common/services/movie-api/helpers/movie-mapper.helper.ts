import { type Movie } from '~/bundles/movies/movies.js';

import { IMG_BASE_URL } from '../constants/constants.js';
import { type MovieApiContent, type MovieApiResponse } from '../types/types.js';
import { getYearString } from './helpers.js';

function movieMapper(moviesFromApi: MovieApiResponse[]): Omit<Movie, 'id'>[] {
    return moviesFromApi.map((response) => {
        const { results } = response;
        return {
            description: (results[0] as MovieApiContent).overview,
            name:
                (results[0] as MovieApiContent)?.name ||
                ((results[0] as MovieApiContent)?.title as string),
            posterUrl: `${IMG_BASE_URL}${(results[0] as MovieApiContent).poster_path}`,
            tmdbId: (results[0] as MovieApiContent).id,
            type: response.type,
            year: getYearString(
                (results[0] as MovieApiContent)?.first_air_date ||
                    (results[0] as MovieApiContent)?.release_date,
            ),
        };
    });
}

export { movieMapper };
