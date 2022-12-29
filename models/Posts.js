import { ObjectId } from "mongodb";
import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  postText: {
    type: String,
  },
  postDate: {
    type: Date,
    default: Date.now(),
  },
  postTime: {
    type: String,
  },
  preference: {
    type: String,
    default: "public",
  },
  likes: {
    type: Number,
    default: 0,
  },
  liked: [
    {
      type: ObjectId,
      ref: "Users",
      default: undefined,
    },
  ],
});

const Posts = models.Posts || model("Posts", PostSchema);

export default Posts;
