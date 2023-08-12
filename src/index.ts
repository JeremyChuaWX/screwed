import * as http from "http";
import { setupHandlers, undefinedUrlHandler } from "./handlers.js";
import { createContext } from "./context.js";

const HOST = "localhost";
const PORT = 3001;

const handlers = setupHandlers();
const ctx = createContext();

const server = http.createServer(function (req, res) {
    const url = req.url
        ? new URL(req.url, `http://${req.headers.host}`)
        : undefined;
    if (url === undefined) {
        undefinedUrlHandler(req, res);
    } else {
        const handler = handlers.get(url);
        if (handler !== undefined) {
            // handler for url was found
            handler(url, req, res, ctx);
        } else {
            // handler for url was not found
            res.writeHead(404).end("site not found");
        }
    }
});

server.listen(PORT, HOST, function () {
    console.log(`🚀 server running on ${HOST}:${PORT}`);
});
