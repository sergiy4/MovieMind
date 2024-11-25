import { type BaseConfig } from '~/common/config/base-config.package.js';
import { HTTPMethod } from '~/common/enums/enums.js';
import { BaseHttpApi } from '~/common/http/base-http-api.js';
import { HttpContentType, HttpHeader } from '~/common/http/enums/enums.js';
import {
    type Http,
    createAuthorizationHeaderString,
} from '~/common/http/http.js';

import { IS_INCLUDE_ADULT } from './constants/constants.js';
import { ContentTypeEnum, MovieApiPath } from './enums/enums.js';
import { type GetMovieRequest, type MovieApiResponse } from './types/types.js';

type Constructor = {
    baseUrl: string;
    path: string;
    http: Http;
    config: BaseConfig;
};

class MovieApi extends BaseHttpApi {
    private config: BaseConfig;

    public constructor({ baseUrl, path, http, config }: Constructor) {
        super({ baseUrl, path, http });

        this.config = config;
    }
    // TODO: Implement method to get data by id for movies and tvs

    public async getMovieByNameAndYear(
        data: GetMovieRequest,
    ): Promise<MovieApiResponse> {
        const response = await this.load(
            this.getFullEndpoint(`${MovieApiPath.MOVIE}`, {
                query: data.name,
                year: data.year,
                include_adult: String(IS_INCLUDE_ADULT),
            }),
            {
                method: HTTPMethod.GET,
                contentType: HttpContentType.JSON,
                headers: [
                    {
                        key: HttpHeader.AUTHORIZATION,
                        value: createAuthorizationHeaderString(
                            this.config.ENV.MOVIE_API.TMDB_KEY,
                        ),
                    },
                ],
            },
        );

        return {
            ...(await response.json<MovieApiResponse>()),
            type: ContentTypeEnum.MOVIE,
        };
    }

    public async getTvByNameAndYear(
        data: GetMovieRequest,
    ): Promise<MovieApiResponse> {
        const response = await this.load(
            this.getFullEndpoint(`${MovieApiPath.TV}`, {
                query: data.name,
                year: data.year,
                include_adult: String(IS_INCLUDE_ADULT),
            }),
            {
                method: HTTPMethod.GET,
                contentType: HttpContentType.JSON,
                headers: [
                    {
                        key: HttpHeader.AUTHORIZATION,
                        value: createAuthorizationHeaderString(
                            this.config.ENV.MOVIE_API.TMDB_KEY,
                        ),
                    },
                ],
            },
        );

        return {
            ...(await response.json<MovieApiResponse>()),
            type: ContentTypeEnum.SERIES,
        };
    }

    public async getMoviesAndTvsByNameAndYear(
        data: GetMovieRequest[],
    ): Promise<MovieApiResponse[]> {
        return await Promise.all(
            data.map((data) => {
                return data.type === ContentTypeEnum.MOVIE
                    ? this.getMovieByNameAndYear(data)
                    : this.getTvByNameAndYear(data);
            }),
        );
    }
}

export { MovieApi };
