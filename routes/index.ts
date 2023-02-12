import Router from "koa-router";
import { UploadImage } from "../controller/uploadImage";
import { UserLogin } from "../controller/users";
import model from "../database/mongoose/index";
import { UserLoginValidate } from "../utils/validate/userValidate";

export default function RouterMethods(router: Router) {
  // router.prefix('/users')
  
  router
    .get("/", async (ctx, next) => {
      await ctx.render("index", { title: "Hello Koa 2!" });
    })
    .get("/e", async (ctx, next) => {
      process.exit();
    })
    .get("/user", async (ctx, next) => {
      ctx.body = await model.users.find();
    })
    .post("/login", UserLoginValidate, UserLogin);

  // 图片文件上传，视频上传执行脚本ffmpeg转码压缩
  router.post("/upload", UploadImage);

  return router;
}
