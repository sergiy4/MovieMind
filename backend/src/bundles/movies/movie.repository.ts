import { RelationName } from '~/common/enums/enums.js';
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

    public async createWithMessageRelation(
        entities: MovieEntity[],
        messageId: number,
    ): Promise<MovieEntity[]> {
        const movies = entities.map((movie) => movie.toNewObject());

        const createdMovies = await this.movieModel
            .query()
            .insert(movies)
            .onConflict(['tmdb_id', 'type'])
            .ignore()
            .then(async (data) => {
                return await this.movieModel
                    .query()
                    .whereIn(
                        ['tmdbId', 'type'],
                        data.map((it) => [it.tmdbId, it.type]),
                    )
                    .execute();
            });

        await Promise.all(
            createdMovies.map((movie) => {
                return movie
                    .$relatedQuery(RelationName.MESSAGES)
                    .relate(messageId);
            }),
        );

        return createdMovies.map((it) => MovieEntity.initialize(it));
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
