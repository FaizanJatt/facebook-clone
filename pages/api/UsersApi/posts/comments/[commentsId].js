import dbConnect from "../../../../../utils/dbConnect";
import Comments from "../../../../../models/Comments";

dbConnect();
export default async (req, res) => {
  const { method, query } = req;
  const postId = query.postId;

  if (method === "GET") {
    try {
      const commentsId = query.commentsId;

      const comments = await Comments.find({ _id: commentsId });
      res.status(200).json({ data: comments });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else {
    console.log("else");
    res.status(400).json({ message: "Access Denied" });
  }
};
