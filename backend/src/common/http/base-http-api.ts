import { HttpError } from 'shared';

import { type HttpCode } from './enums/enums.js';
import { HttpHeader } from './enums/enums.js';
import { getStringifiedQuery } from './helpers/helpers.js';
import {
    type CustomHeader,
    type Http,
    type HttpApi,
    type HTTPApiOptions,
    type HttpApiResponse,
    type ValueOf,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    path: string;
    http: Http;
};

class BaseHttpApi implements HttpApi {
    private baseUrl: string;

    private path: string;

    private http: Http;

    public constructor({ baseUrl, path, http }: Constructor) {
        this.baseUrl = baseUrl;
        this.path = path;
        this.http = http;
    }

    public async load(
        path: string,
        options: HTTPApiOptions,
    ): Promise<HttpApiResponse> {
        const {
            method,
            contentType,
            payload = null,
            headers: customHeaders,
            credentials = 'same-origin',
        } = options;

        const baseHeaders = [
            { key: HttpHeader.CONTENT_TYPE, value: contentType },
        ];

        const headers = this.getHeaders([
            ...baseHeaders,
            ...(customHeaders || []),
        ]);

        const response = await this.http.load(path, {
            method,
            headers,
            payload,
            credentials,
        });

        return this.checkResponse(response) as HttpApiResponse;
    }

    protected getFullEndpoint<T extends Record<string, string>>(
        url: string,
        queryParameters: T,
    ): string {
        const copiedParameters = [this.baseUrl, this.path, url];

        const result = copiedParameters.join('');

        const queryParametersString = getStringifiedQuery(queryParameters);

        return `${result}?${queryParametersString}`;
    }

    private getHeaders(customHeaders: CustomHeader): Headers {
        const headers = new Headers();

        for (const header of customHeaders) {
            headers.append(header.key, header.value);
        }

        return headers;
    }

    private checkResponse(response: Response): Response {
        if (!response.ok) {
            this.handleError(response);
        }

        return response;
    }

    private handleError(response: Response): never {
        throw new HttpError({
            status: response.status as ValueOf<typeof HttpCode>,
            message: response.statusText,
        });
    }
}

export { BaseHttpApi };
