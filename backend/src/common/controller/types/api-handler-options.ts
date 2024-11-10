type DefaultApiHandlerOptions = {
    body?: unknown;
    user?: unknown;
    params?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    user: T['user'];
    params: T['params'];
};

export { type ApiHandlerOptions };
