#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app";
import debug from "debug";
import http from "http";
debug("demo:server");

var port = normalizePort("3000");

var server = http.createServer(app.callback());

server.listen(port, () => {
  console.log("127.0.0.1:3000");
});
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) return val;

  if (port >= 0) return port;

  return false;
}

function onError(error:any) {
  if (error.syscall !== "listen") throw error; 

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + (addr as any).port;
  debug("Listening on " + bind);
}
