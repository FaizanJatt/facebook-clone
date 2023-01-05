import dbConnect from "../../../../utils/dbConnect";
import Covers from "../../../../models/Cover";

dbConnect();
const CoverIdApi = async (req, res) => {
  const { method, query } = req;
  console.log(query);
  console.log("method is", method);
  if (method === "GET") {
    try {
      console.log("GETTING");
      const userId = query.coverId;
      const allCovers = await Covers.find({ user: userId }).sort({ _id: -1 });
      res.status(200).json({ data: allCovers });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  //    else if (method === "PUT") {
  //     const update = await Posts.findOneAndUpdate({ _id: postsId }, postUpdate);
  //     console.log("trying to unlike");
  //     res.status(200).json({ data: update });
  //   }
  else {
    console.log("else");
    res.status(400).json({ message: "Access Denied" });
  }
};

export default CoverIdApi;
