import dbConnect from "../../../../../utils/dbConnect";
import Comments from "../../../../../models/Comments";

dbConnect();
export default async (req, res) => {
  const { method, query } = req;
  let postId;
  if (query.postId) {
    postId = query.postId;
  }

  if (method === "GET") {
    if (postId) {
      try {
        const comments = await Comments.find({ post: postId }).populate(
          "author"
        );
        res.status(200).json({ comments });
      } catch (error) {
        res.status(400).json({ error: error });
      }
    } else if (!postId) {
      try {
        const comments = await Comments.find({}).populate("author");
        res.status(200).json({ data: comments });
      } catch (error) {
        res.status(400).json({ error: error });
      }
    }
  } else if (method === "POST") {
    try {
      const comment = await Comments.create(req.body);
      res.status(200).json({ data: comment });
    } catch (error) {
      console.log("Failed");
      res.status(400).json({ error: error });
    }
  } else {
    console.log("else");
    res.status(400).json({ message: "Access Denied" });
  }
};
