import request from "supertest";
import app from '../app';

describe("server test",()=>{

  let server=app.listen(8080);

  describe("group one",()=>{
    it("test GET",async ()=>{
      
      await request(server)
        .get('/')
        .expect(200,'respond with a resource');
      
    });

  });

});