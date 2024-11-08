type Service<T = unknown> = {
    findById(id: number): Promise<T>;
    findAll(): Promise<{
        items: T[];
    }>;
    create(payload: unknown): Promise<T>;
    update(id: number, payload: unknown): Promise<T>;
    delete(id: number): Promise<boolean>;
};

export { type Service };
