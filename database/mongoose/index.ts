import mongoose from "mongoose";
import UserModel from "./user";
import VideoModel from "./video";
mongoose.set("strictQuery", true);

async function connect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}


connect()
  .then(() => {
    console.log("mongo connect success.");
  })
  .catch(() => {
    console.log("mongo connect fail.");
  });


export default {
  users: UserModel(mongoose),
  videos: VideoModel(mongoose),
};
