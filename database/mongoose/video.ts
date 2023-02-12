import { Mongoose } from "mongoose";
import { format } from "date-fns";

export default function videos(mongoose: Mongoose) {
  let video = new mongoose.Schema({
    title:{ type:String, required:true },

    descrption:{ type:String, required:false },

    vodvideoId:{ type:String, required:true },

    user:{ type:(mongoose as any).ObjectId, required:true, ref:'User' },

    channel:{ type:String, required:false },

    commentCount:{ type:Number, default:0 },

    likeCount:{ type:Number, default:0 },

    dislikeCount:{ type:Number, default:0 },

    createAt: { type: Date, default: format(new Date(), "yyyy-MM-dd HH:mm:ss") },

    updateAt: { type: Date, default: format(new Date(), "yyyy-MM-dd HH:mm:ss") },
  });

  return mongoose.model("Video", video);
}
