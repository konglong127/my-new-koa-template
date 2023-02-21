import koa from "koa";
import Router from "koa-router";
import views from "koa-views";
import json from "koa-json";
import logger from "koa-logger";
import cors from "@koa/cors";
import range from "koa-range";
import bodyParser from "koa-bodyparser";
import koaStatic from "koa-static";
import { RateLimit } from "koa2-ratelimit";
import path from "path";
import index from "./routes/index";

const app = new koa();

const router = new Router();

//  apply to all requests
const limiter = RateLimit.middleware({
  interval: { min: 30 }, // 60 minutes = 60*60*1000
  max: 180, // limit each IP to 100 requests per interval
  message:
    "Too many accounts created from this IP, please try again after an 30 minutes",
});

// middlewares
app.use(limiter);
app.use(cors());
app.use(bodyParser());
app.use(json());
app.use(logger());

app.use(range);
app.use(koaStatic(path.join(__dirname, "./public")));

app.use(views(path.join(__dirname, "./views"), { extension: "pug" }));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.app.emit("error", err, ctx);
  }
});

// routes
// app.use(index.routes());
app.use(index(router).routes());

app.on("error", (err, ctx) => {
  console.log(err);
  ctx.response.status = 200;
  ctx.response.body = "404,您访问路径不存在！";
});

// throw new Error('????????????????????????????');
// process.exit();

export default app;
module.exports = app;
