import formidable from "formidable";
import FileType from "file-type";
import fs from "fs";
import path from "path";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import { ParameterizedContext } from "koa";
import Router from "koa-router";

// 配置接收上传文件方法
export async function getUpLoadFile(
  ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  const form = formidable({
    keepExtensions: true,
    allowEmptyFiles: false,
    multiples: false,
    maxFileSize: 5 * 1024 * 1024, //接收上传的文件大小5mb
    maxTotalFileSize: 10 * 1024 * 1024,
    uploadDir: path.resolve(__dirname, "../../public/upload"),
    filter: (part: formidable.Part) => {
      // console.log(part);

      if (part.name === "UploadFile") {
        return true;
      } else {
        return false;
      }
    },
  });

  let upload: { fields: formidable.Fields; files: formidable.Files } =
    await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });

  return upload;
}

// 图片验证方法
export const UploadFileValidate = async (FilePath: string) => {
  const stream = fs.createReadStream(FilePath);
  let fileType = await FileType.fromStream(stream);
  return fileType;
};

// 图片压缩方法
export const ImageCompress = async (inPath: string) => {
  if (fs.existsSync(inPath)) {
    // console.log(inPath);
    await imagemin([inPath], {
      destination: "./public/images",
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          speed: 11,
          quality: [0.5, 0.5],
        }),
      ],
    });
  }
};

