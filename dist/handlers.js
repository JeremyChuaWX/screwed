import { Worker } from "worker_threads";
const indexHandler = (req, res, appState) => {
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
const heavyHandler = (req, res) => {
    const worker = new Worker("./dist/heavy.js");
    worker.on("message", (data) => {
        res.setHeader("content-type", "application/json");
        res.writeHead(200);
        res.end(JSON.stringify({ data }));
    });
    worker.on("error", (err) => {
        res.setHeader("content-type", "application/json");
        res.writeHead(500);
        res.end(JSON.stringify({ msg: err }));
    });
};
export { indexHandler, heavyHandler };
