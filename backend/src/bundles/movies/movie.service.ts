import { type Service } from '~/common/types/types.js';

import { MovieEntity } from './movie.entity.js';
import { type MovieRepository } from './movie.repository.js';
import { type Movie } from './types/types.js';

type Constructor = {
    movieRepository: MovieRepository;
};

class MovieService implements Service {
    private movieRepository: MovieRepository;

    public constructor({ movieRepository }: Constructor) {
        this.movieRepository = movieRepository;
    }

    public async create(payload: Omit<Movie, 'id'>): Promise<Movie> {
        const { description, name, posterUrl, tmdbId, year, type } = payload;

        const movie = await this.movieRepository.create(
            MovieEntity.initializeNew({
                description,
                name,
                posterUrl,
                tmdbId,
                year,
                type,
            }),
        );

        return movie.toObject();
    }

    public async createWithMessageRelation(
        payload: Omit<Movie, 'id'>[],
        messageId: number,
    ): Promise<Movie[]> {
        const movies = await this.movieRepository.createWithMessageRelation(
            payload.map((movie) =>
                MovieEntity.initializeNew({
                    ...movie,
                }),
            ),
            messageId,
        );
        return movies.map((it) => it.toObject());
    }

    public async findAll(): Promise<{ items: Movie[] }> {
        const items = await this.movieRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async findById(id: number): Promise<MovieEntity | null> {
        return await this.movieRepository.findById(id);
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Service['delete']> {
        return Promise.resolve(true);
    }
}

export { MovieService };
