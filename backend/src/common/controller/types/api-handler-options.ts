type DefaultApiHandlerOptions = {
    body?: unknown;
    user?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    user: T['user'];
};

export { type ApiHandlerOptions };
