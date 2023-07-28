import { parentPort } from "worker_threads";

const args = process.argv.slice(2);

await new Promise((resolve) => {
    setTimeout(resolve, 10_000);
});

parentPort?.postMessage(`waited 10 seconds for ${args}`);
