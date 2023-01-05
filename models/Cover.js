import { ObjectId } from "mongodb";
import mongoose, { Schema, model, models } from "mongoose";

const CoverSchema = new Schema({
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
  //   otherCoverImages: [
  //     {
  //       type: ObjectId,
  //       ref: "Covers",
  //       default: undefined,
  //     },
  //   ],
});

const Covers = models.Covers || model("Covers", CoverSchema);

export default Covers;
