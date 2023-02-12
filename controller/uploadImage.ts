import { Next, ParameterizedContext } from "koa";
import Router from "koa-router";
import fs from "fs";
import {
  getUpLoadFile,
  ImageCompress,
  UploadFileValidate,
} from "../utils/UploadFile/index";
import model from "../database/mongoose/index";

export const UploadImage = async (
  ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
  next: Next,
) => {
  // 接收文件
  let upload = await getUpLoadFile(ctx);

  // 验证文件类型  { ext: 'png', mime: 'image/png' } 脚本代码等返回undefined
  if (upload.files.UploadFile && (upload.files.UploadFile as any).filepath) {
    // 获取文件路径
    let inPath = (upload.files.UploadFile as any).filepath;
    // 获取文件名
    let ImageName = (upload.files.UploadFile as any).newFilename;

    // 获取验证后文件类型
    let fv = await UploadFileValidate(inPath);

    console.log("file type validate", fv);

    // 判断验证结果，判断文件是否带后缀名
    if (fv && fv.ext === "png" || fv && fv.ext === "jpg") {
      if (
        fv.ext === "png" && !ImageName.endsWith(".png") &&
        !ImageName.endsWith(".jpg")
      ) {
        ImageName += ".png";
        fs.renameSync(inPath, inPath + ".png");
        inPath += ".png";
      }

      if (
        fv.ext === "jpg" && !ImageName.endsWith(".png") &&
        !ImageName.endsWith(".jpg")
      ) {
        ImageName += ".jpg";
        fs.renameSync(inPath, inPath + ".jpg");
        inPath += ".jpg";
      }

      // 压缩图片
      let compress = `./public/images/${ImageName}`;
      fs.renameSync(`./public/upload/${ImageName}`, compress);
      await ImageCompress(compress);
    } else {
      // 不是图片直接删除
      fs.unlinkSync(inPath);

      ctx.body = { msg: "uploaded file type error.", status: 200 };
      return;
    }
  } else {
    // 没上传文件直接返回
    ctx.body = { msg: "no file uploaded.", status: 200 };
    return;
  }

  // 上传成功
  ctx.set("Content-Type", "application/json");
  ctx.status = 200;
  ctx.state = upload;
  ctx.body = { msg: "upload success", data: ctx.state, status: 200 };
};
