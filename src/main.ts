import * as http from "http";
import { heavyHandler, indexHandler } from "./handlers.js";
import type { AppState } from "./types.js";

const PORT = 3001;
const HOST = "localhost";

let appState: AppState = {
    counter: 0,
};

const reqListener: http.RequestListener = (req, res) => {
    switch (req.url) {
        case "/": {
            indexHandler(req, res, appState);
            break;
        }
        case "/heavy": {
            heavyHandler(req, res);
            break;
        }
        default:
            break;
    }
};

const server = http.createServer(reqListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is runing on http://${HOST}:${PORT}`);
});
