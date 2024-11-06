type Repository<T = unknown> = {
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(id: number, payload: unknown): Promise<T | null>;
    delete(id: number): Promise<boolean>;
};

export { type Repository };
