import { Next, ParameterizedContext } from "koa";
import Router from "koa-router";
import fs from "fs";
import model from "../database/mongoose/index";

export const UserLogin = async (
  ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Next,
) => {
  ctx.body='ok';
};
