import { ObjectId } from "mongodb";
import mongoose, { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema({
  cover: {
    type: String,
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
