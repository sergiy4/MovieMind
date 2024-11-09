import { ApiPath, AuthApiPath, HTTPMethod } from 'shared';

const WHITE_ROUTES = [
    {
        path: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
        method: HTTPMethod.POST,
    },
    {
        path: `/api/v1${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
        method: HTTPMethod.POST,
    },
];

export { WHITE_ROUTES };
