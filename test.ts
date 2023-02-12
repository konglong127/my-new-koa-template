import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';

(async ()=>{
  const files = await imagemin(['D:\\VScode\\nodejs\\improve\\nodejs\\koa\\test1\\public\\upload\\1.png'], {
    destination: 'D:\\VScode\\nodejs\\improve\\nodejs\\koa\\test1\\public\\images',
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  });
  
  fs.unlinkSync('./public/upload/1.png');
  console.log(files);
})()

//=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]