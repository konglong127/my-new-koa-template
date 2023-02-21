import app from "../app";
import debug from "debug";
import http from "http";
import { server as ServerConfig } from "../config"
debug("demo:server");

var port = normalizePort(ServerConfig);

var server = http.createServer(app.callback());

server.listen(port, () => {
  console.log(`127.0.0.1:${port}`);
});

server.on("error", onError);

server.on("listening", onListening);

function normalizePort(ServerConfig: Array<{ port: string, type: string }> | undefined) {
  let port: number = 3000;
  if (Array.isArray(ServerConfig)) {
    port = parseInt(ServerConfig[0].port, 10);
  }

  if (isNaN(port)) return 3000;

  if (port >= 0) return port;

  return 3000;
}

function onError(error: any) {
  if (error.syscall !== "listen") throw error;

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  var addr: any = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
