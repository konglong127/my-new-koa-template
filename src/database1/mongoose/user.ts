import { Mongoose } from "mongoose";
import { format } from "date-fns";

export default function users(mongoose: Mongoose) {
  let user = new mongoose.Schema({
    name: { type: String, required: true },

    password: { type: String, required: true },

    age: { type: Number, require: true },

    sex: { type: String, require: true },

    phone: { type: String, require: true },

    email: { type: String, required: true },

    image: { type: String, default: null },

    myChannel: { type: String, default: null },
    
    describle: { type: String, default: null },

    subscribeCount:{ type:Number, default:0 },

    createAt: {
      type: Date,
      default: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    },

    updateAt: {
      type: Date,
      default: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    },
  });

  return mongoose.model("User", user);
}
