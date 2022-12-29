import dbConnect from "../../../../utils/dbConnect";
import Posts from "../../../../models/Posts";

dbConnect();
const commentsApi = async (req, res) => {
  const { method, query } = req;
  if (method === "GET") {
    try {
      const posts = await Posts.find({}).populate("author").populate("liked");
      res.status(200).json({ data: posts });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else if (method === "POST") {
    try {
      console.log("POST BODY", req.body);
      const post = await Posts.create(req.body);
      res.status(200).json({ data: post });
      console.log(post);
    } catch (error) {
      console.log("failed");
      res.status(400).json({ error: error });
    }
  } else {
    console.log("else");
    res.status(400).json({ message: "Access Denied" });
  }
};

export default commentsApi;
