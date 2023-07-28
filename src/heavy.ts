import { parentPort } from "worker_threads";

setTimeout(() => {
    parentPort?.postMessage("waited 10 seconds");
}, 10_000);
