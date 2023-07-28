import { Worker } from "worker_threads";
import type { RequestHandler } from "./types.js";

const indexHandler: RequestHandler = (req, res, appState) => {
    if (appState === undefined) {
        res.setHeader("content-type", "application/json");
        res.writeHead(500);
        res.end(JSON.stringify({ msg: "empty state" }));
        return;
    }
    appState.counter++;
    res.setHeader("content-type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({ counter: appState.counter }));
};

const heavyHandler: RequestHandler = (req, res) => {
    const worker = new Worker("./dist/heavy.js", {
        argv: ["arg1", "arg2", "arg3"],
    });
    worker.on("message", (data: any) => {
        res.setHeader("content-type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({ data }));
    });
    worker.on("error", (err: any) => {
        res.setHeader("content-type", "application/json");
        res.writeHead(500);
        res.end(JSON.stringify({ msg: err }));
    });
};

export { indexHandler, heavyHandler };
