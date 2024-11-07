type DefaultApiHandlerOptions = {
    body?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
};

export { type ApiHandlerOptions };
