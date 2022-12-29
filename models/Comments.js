import mongoose, { Schema, model, models } from "mongoose";

const CommentsSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Posts",
  },
  comment: {
    type: String,
  },
  postDate: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: String,
  },
  commentsCount: {
    type: String,
  },
});

const Comments = models.Comments || model("Comments", CommentsSchema);

export default Comments;
