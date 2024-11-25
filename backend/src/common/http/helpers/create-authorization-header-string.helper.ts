const createAuthorizationHeaderString = (key: string): string => {
    return `Bearer ${key}`;
};

export { createAuthorizationHeaderString };
