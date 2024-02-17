import fs from "fs";

export function CopyDocs(FilePath: { src: string; dist: string }) {
  const { src, dist } = FilePath;
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dist)) {
      try {
        fs.mkdirSync(dist);
      } catch {
        let files = dist.split("\\");
        for (let i = 1; i <= files.length; ++i) {
          let createDirPath = files.slice(0, i).join("\\");
          // console.log(createDirPath);
          if (!fs.existsSync(createDirPath)) {
            fs.mkdirSync(createDirPath);
          }
        }
      }
    }

    let dir = fs.readdirSync(src);
    for (let i in dir) {
      if (fs.statSync(`${src}/${dir[i]}`).isDirectory()) {
        CopyDocs({ src: `${src}/${dir[i]}`, dist: `${dist}/${dir[i]}` });

        if (!fs.existsSync(`${dist}/${dir[i]}`)) {
          fs.mkdirSync(`${dist}/${dir[i]}`);
        }
      } else {
        let res = fs.readFileSync(`${src}/${dir[i]}`, "utf-8");
        fs.writeFileSync(`${dist}/${dir[i]}`, res);
      }
    }
  } else {
    console.log("copy file: '", src, "' not exists.");
  }
}
