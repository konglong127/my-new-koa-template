import request from "supertest";
import app from '../app';
import fs from 'fs';
import path from 'path';

describe("server test",()=>{
  
  let server=app.listen(8080);
  
  describe("group one",()=>{
    it("test GET",async ()=>{
      
      let data=fs.readFileSync(path.resolve(__dirname,'../../views/index.html'),'utf-8');
      console.log(data);

      await request(server)
        .get('/')
        .expect(200,data);
    });

  });

  after(() => {
    server.close();
    process.exit();
  });
});