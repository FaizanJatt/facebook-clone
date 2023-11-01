import { ObjectId } from "mongodb";
import mongoose, { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema({
  cover: {
    type: String,
    default:
      "https://res.cloudinary.com/dguei52eb/image/upload/v1698829205/pfp_lxjws1.png",
  },
  postDate: {
    type: Date,
    default: Date.now(),
  },
  postTime: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: ObjectId,
    ref: "Users",
  },
});

const Profiles = models.Profiles || model("Profiles", ProfileSchema);

export default Profiles;
