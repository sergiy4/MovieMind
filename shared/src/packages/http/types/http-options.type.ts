import { type HttpMethod } from './http-method.type.js';

type HttpOptions = {
    method: HttpMethod;
    payload: BodyInit | null;
    headers: Headers;
    credentials: RequestCredentials;
};

export { type HttpOptions };
