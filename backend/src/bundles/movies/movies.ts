import { movieApi } from '~/common/services/services.js';

import { MovieModel } from './movie.model.js';
import { MovieRepository } from './movie.repository.js';
import { MovieService } from './movie.service.js';

const movieRepository = new MovieRepository(MovieModel);
const movieService = new MovieService({ movieRepository, movieApi });

export { movieService };
export { MovieModel } from './movie.model.js';
export { type Movie } from './types/types.js';
