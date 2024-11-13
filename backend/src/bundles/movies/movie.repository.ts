import { type Repository } from '~/common/types/types.js';

import { MovieEntity } from './movie.entity.js';
import { type MovieModel } from './movie.model.js';

class MovieRepository implements Repository {
    private movieModel: typeof MovieModel;

    public constructor(movieModel: typeof MovieModel) {
        this.movieModel = movieModel;
    }

    public async create(entity: MovieEntity): Promise<MovieEntity> {
        const { description, name, posterUrl, tmdbId, year } =
            entity.toNewObject();

        const item = await this.movieModel
            .query()
            .insert({
                description,
                name,
                posterUrl,
                tmdbId,
                year,
            })
            .returning('*')
            .execute();

        return MovieEntity.initialize(item);
    }

    public async findById(id: number): Promise<MovieEntity | null> {
        const user = await this.movieModel.query().findById(id).execute();

        return user ? MovieEntity.initialize(user) : null;
    }

    public async findAll(): Promise<MovieEntity[]> {
        const users = await this.movieModel.query().execute();

        return users.map((it) => MovieEntity.initialize(it));
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { MovieRepository };
