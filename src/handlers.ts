import * as http from "http";
import type { Context } from "./context.js";
import { Worker } from "worker_threads";

type Handler = (
    url: URL,
    req: http.IncomingMessage,
    res: http.ServerResponse,
    ctx: Context,
) => void;

class Handlers {
    map: Map<string, Handler>;

    constructor() {
        this.map = new Map<string, Handler>();
    }

    set(pathname: string, handler: Handler) {
        this.map.set(pathname, handler);
    }

    get(url: URL) {
        return this.map.get(url.pathname);
    }
}

function setupHandlers(): Handlers {
    const handlers = new Handlers();
    handlers.set("/", indexHandler);
    handlers.set("/increment", incrementHandler);
    handlers.set("/set", setHandler);
    handlers.set("/fib", fibHandler);
    return handlers;
}

const undefinedUrlHandler = (
    req: http.IncomingMessage,
    res: http.ServerResponse,
) => {
    res.writeHead(500).end("internal server error");
};

const indexHandler: Handler = (url, req, res, ctx) => {
    res.writeHead(200).end(`current count: ${ctx.state.count}`);
};

const incrementHandler: Handler = (url, req, res, ctx) => {
    ctx.state.count++;
    res.writeHead(200).end(`new count: ${ctx.state.count}`);
};

const setHandler: Handler = (url, req, res, ctx) => {
    const query = url.searchParams.get("count");
    const parsedQuery = query !== null ? parseInt(query) : null;
    if (parsedQuery !== null && parsedQuery !== ctx.state.count) {
        ctx.state.count = parsedQuery;
        res.writeHead(200).end(`new count: ${ctx.state.count}`);
    } else {
        res.writeHead(200).end(`count remains: ${ctx.state.count}`);
    }
};

const fibHandler: Handler = async (url, req, res, ctx) => {
    const workerPromise = new Promise<number>((resolve, reject) => {
        const worker = new Worker("./dist/fib.js", {
            workerData: { count: ctx.state.count },
        });
        worker.once("message", (data) => {
            resolve(data);
        });
        worker.once("error", (err) => {
            reject(err);
        });
    });
    const workerResult = await workerPromise;
    res.writeHead(200).end(`fibonacci: ${workerResult}`);
};

export { setupHandlers, undefinedUrlHandler };
