import { type Entity } from '~/common/types/types.js';

import { type ContentType } from './types/types.js';

class MovieEntity implements Entity {
    private 'id': number | null;

    private 'name': string;

    private 'year': string;

    private 'posterUrl': string;

    private 'description': string;

    private 'tmdbId': number;

    private 'type': ContentType;

    private constructor({
        id,
        description,
        name,
        posterUrl,
        tmdbId,
        year,
        type,
    }: {
        id: number | null;
        name: string;
        year: string;
        posterUrl: string;
        description: string;
        tmdbId: number;
        type: ContentType;
    }) {
        this.id = id;
        this.name = name;
        this.posterUrl = posterUrl;
        this.year = year;
        this.description = description;
        this.tmdbId = tmdbId;
        this.type = type;
    }

    public static initialize({
        id,
        description,
        name,
        posterUrl,
        tmdbId,
        year,
        type,
    }: {
        id: number;
        name: string;
        year: string;
        posterUrl: string;
        description: string;
        tmdbId: number;
        type: ContentType;
    }): MovieEntity {
        return new MovieEntity({
            id,
            description,
            name,
            posterUrl,
            tmdbId,
            year,
            type,
        });
    }

    public static initializeNew({
        description,
        name,
        posterUrl,
        tmdbId,
        year,
        type,
    }: {
        name: string;
        year: string;
        posterUrl: string;
        description: string;
        tmdbId: number;
        type: ContentType;
    }): MovieEntity {
        return new MovieEntity({
            id: null,
            description,
            name,
            posterUrl,
            tmdbId,
            year,
            type,
        });
    }

    public toObject(): {
        id: number;
        name: string;
        year: string;
        posterUrl: string;
        description: string;
        tmdbId: number;
        type: ContentType;
    } {
        return {
            id: this.id as number,
            description: this.description,
            name: this.name,
            posterUrl: this.posterUrl,
            tmdbId: this.tmdbId,
            year: this.year,
            type: this.type,
        };
    }

    public toNewObject(): {
        name: string;
        year: string;
        posterUrl: string;
        description: string;
        tmdbId: number;
        type: ContentType;
    } {
        return {
            description: this.description,
            name: this.name,
            posterUrl: this.posterUrl,
            tmdbId: this.tmdbId,
            year: this.year,
            type: this.type,
        };
    }
}

export { MovieEntity };
