import dbConnect from "../../../../utils/dbConnect";
import Posts from "../../../../models/Posts";

dbConnect();
export default async (req, res) => {
  const { method, query } = req;
  console.log(query);
  console.log("method is", method);
  if (method === "GET") {
    try {
      console.log("GETTING");
      const postsId = query.postsId;
      const posts = await Posts.find({ _id: postsId });
      res.status(200).json({ data: posts });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else if (method === "PUT") {
    const userId = query.user;
    const postsId = query.postsId;
    const action = query.a;
    const postUpdate = await Posts.findById({ _id: postsId });
    if (action == "like") {
      console.log("trying to like");
      const HasUserAlreadyLiked = postUpdate.liked.filter((user) => {
        return user == userId;
      });
      if (!HasUserAlreadyLiked) {
        postUpdate.likes++;
        postUpdate.liked.push(userId);
      } else if (postUpdate.liked.length === 0) {
        postUpdate.liked.push(userId);
        postUpdate.likes++;
      }
      const update = await Posts.findOneAndUpdate({ _id: postsId }, postUpdate);
      res.status(200).json({ data: update });
    } else if (action == "unlike") {
      const HasUserAlreadyLiked = postUpdate.liked.filter((user) => {
        return user == userId;
      });
      console.log(HasUserAlreadyLiked);
      if (HasUserAlreadyLiked) {
        postUpdate.likes--;
        postUpdate.liked.pop(userId);
      }

      const update = await Posts.findOneAndUpdate({ _id: postsId }, postUpdate);
      console.log("trying to unlike");
      res.status(200).json({ data: update });
    }
  } else {
    console.log("else");
    res.status(400).json({ message: "Access Denied" });
  }
};
