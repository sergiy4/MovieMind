import { MovieModel } from './movie.model.js';
import { MovieRepository } from './movie.repository.js';
import { MovieService } from './movie.service.js';

const movieRepository = new MovieRepository(MovieModel);
const movieService = new MovieService({ movieRepository });

export { movieService };
export { type Movie } from './types/types.js';
