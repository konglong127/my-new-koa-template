import cluster, { Worker } from "cluster";
import process from "process";
import http from "http";
import { environment, server } from "../config";
import koa from "koa";

// 子进程接收的信息
type msg = {
  pid: number;
  info: { port: string; type: string };
};
// 一个子进程
type aWorker = { worker: Worker; info: { port: string; type: string } };
// 子进程数组
const workers: Array<aWorker> = [];
// 进程重启次数统计，防止死循环
var restart: Array<number> = [];

// 创建进程函数
async function Cluster() {
  if (cluster.isPrimary) {
    for (let i = 0; i < server.length; i++) {
      workers.push({ worker: cluster.fork(), info: server[i] });

      workers[i].worker.send({
        pid: workers[i].worker.process.pid,
        info: server[i],
      });
    }

    if (server.length == 0) console.log("no server start!");

    cluster.on("fork", (worker: Worker) => {
      if (environment === "dev") {
        console.log(
          "[dev] pid",
          worker.process.pid,
          "已创建进程数:",
          workers.length,
          "应有程数:",
          server.length,
        );
      }

      worker.on("message", (pid: number) => {
        process.kill(pid);
      });
    });

    cluster.on("exit", (worker: Worker) => {
      clusterRestart(worker);

      if (environment === "dev") console.log(`[dev] 进程数：${workers.length}`);
    });
  } else {
    process.on("message", (data: msg) => {
      let { info, pid } = data;

      const app: koa<koa.DefaultState, koa.DefaultContext> = require("../app");
      const server = http.createServer(app.callback());

      server.listen(info.port, () => {
        console.log(`127.0.0.1:${info.port}`, pid);
      });

      process.on("SIGTERM", function () {
        server.close(function () {
          process.exit();
        });
      });

      process.on("uncaughtException", (err) => {
        (<any> process).send(pid);
      });
    });
  }
}

// 进程重启函数
function clusterRestart(worker: Worker) {
  if (environment === "dev") {
    console.log("[dev] 进程 " + worker.process.pid + " 退出了");
  }

  restart.push(new Date().getTime());

  if (restart.length > 20) {
    restart = restart.slice(restart.length - 20, restart.length);
  }

  if (environment === "dev") {
    console.log(
      "[dev] process restart times:",
      restart.length,
      "process restart interval:",
      restart[restart.length - 1] - restart[0],
    );
  }

  if (
    restart.length >= 20 && restart[restart.length - 1] - restart[0] <= 20000
  ) {
    if (environment === "dev") console.log("[dev] seriously error!");
    process.exit();
  }

  let index = workers.findIndex((item: aWorker) =>
    item.worker.process.pid === worker.process.pid
  );
  if (index !== -1) {
    let newWorker = cluster.fork();
    let info = workers[index].info;

    workers.push({ worker: newWorker, info });
    newWorker.send({ pid: newWorker.process.pid, info });

    workers.splice(index, 1);
  } else {
    console.log("create new worker fail!");
  }
}

Cluster();

// import http2 from "http2";
// import https from "https";

// const server = http2.createSecureServer(options, app.callback());
// const server = https.createServer(options, app.callback());      

// http2证书
// const options: { key: string; cert: string } = {
//   key: fs.readFileSync(
//     path.resolve(__dirname, "../utils/keys/private.pem"),
//     "utf-8",
//   ),
//   cert: fs.readFileSync(
//     path.resolve(__dirname, "../utils/keys/file.crt"),
//     "utf-8",
//   ),
// };
