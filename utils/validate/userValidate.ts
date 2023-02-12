import Joi from "joi";
import { Next, ParameterizedContext } from "koa";
import Router from "koa-router";

export const UserLoginValidate = async (
  ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Next,
) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).max(20).required(),
    email: Joi.string().email().required(),
  }).validate(ctx.request.body);

  console.log(schema);
  if (schema.error) {
    ctx.body = { msg: schema.error.details, status: 200 };
  } else {
    await next();
  }
};
