import Router from "koa-router";
import { UploadImage } from "../controller/uploadImage";
import { UserApi } from "../controller/users";
import model from "../database/mongoose/index";

export default function RouterMethods(router: Router) {
  // router.prefix('/users')

  router
    .get("/", async (ctx, next) => {
      await ctx.render("index", {});
    })
    .get("/e", async (ctx, next) => {
      process.exit();
    })
    .get("/user", async (ctx, next) => {
      ctx.body = await model.users.find();
    })
    .post("/login", UserApi.UserLoginValidate, UserApi.UserLogin);

  // 图片文件上传，视频上传执行脚本ffmpeg转码压缩
  router.post("/upload", UploadImage);

  return router;
}
