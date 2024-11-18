type DefaultApiHandlerOptions = {
    body?: unknown;
    user?: unknown;
    params?: unknown;
    query?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    user: T['user'];
    params: T['params'];
    query: T['query'];
};

export { type ApiHandlerOptions };
