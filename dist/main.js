import * as http from "http";
import { heavyHandler, indexHandler } from "./handlers.js";
const PORT = 3001;
const HOST = "localhost";
let appState = {
    counter: 0,
};
const reqListener = (req, res) => {
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
