import { type Entity } from '~/common/types/types.js';

class MovieEntity implements Entity {
    private 'id': number | null;

    private 'name': string;

    private 'year': string;

    private 'posterUrl': string;

    private 'description': string;

    private 'tmdbId': string;

    private constructor({
        id,
        description,
        name,
        posterUrl,
        tmdbId,
        year,
    }: {
        id: number | null;
        name: string;
        year: string;
        posterUrl: string;
        description: string;
        tmdbId: string;
    }) {
        this.id = id;
        this.name = name;
        this.posterUrl = posterUrl;
        this.year = year;
        this.description = description;
        this.tmdbId = tmdbId;
    }

    public static initialize({
        id,
        description,
        name,
        posterUrl,
        tmdbId,
        year,
    }: {
        id: number;
        name: string;
        year: string;
        posterUrl: string;
        description: string;
        tmdbId: string;
    }): MovieEntity {
        return new MovieEntity({
            id,
            description,
            name,
            posterUrl,
            tmdbId,
            year,
        });
    }

    public static initializeNew({
        description,
        name,
        posterUrl,
        tmdbId,
        year,
    }: {
        name: string;
        year: string;
        posterUrl: string;
        description: string;
        tmdbId: string;
    }): MovieEntity {
        return new MovieEntity({
            id: null,
            description,
            name,
            posterUrl,
            tmdbId,
            year,
        });
    }

    public toObject(): {
        id: number;
        name: string;
        year: string;
        posterUrl: string;
        description: string;
        tmdbId: string;
    } {
        return {
            id: this.id as number,
            description: this.description,
            name: this.name,
            posterUrl: this.posterUrl,
            tmdbId: this.tmdbId,
            year: this.year,
        };
    }

    public toNewObject(): {
        name: string;
        year: string;
        posterUrl: string;
        description: string;
        tmdbId: string;
    } {
        return {
            description: this.description,
            name: this.name,
            posterUrl: this.posterUrl,
            tmdbId: this.tmdbId,
            year: this.year,
        };
    }
}

export { MovieEntity };
