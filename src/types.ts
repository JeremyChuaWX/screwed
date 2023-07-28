import * as http from "http";

export type AppState = {
    counter: number;
};

export type RequestHandler = (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    },
    appState?: AppState,
) => void;
