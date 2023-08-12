type Context = {
    state: { count: number };
};

function createContext(): Context {
    return {
        state: { count: 0 },
    };
}

export { Context, createContext };
