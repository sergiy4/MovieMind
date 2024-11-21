type DefaultApiHandlerOptions = {
    body?: unknown;
    user?: unknown;
    params?: unknown;
    query?: unknown;
    session?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    user: T['user'];
    params: T['params'];
    query: T['query'];
    session: T['session'];
};

export { type ApiHandlerOptions };
