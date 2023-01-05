import dbConnect from "../../../../utils/dbConnect";
import Covers from "../../../../models/Cover";

dbConnect();
const CoversApi = async (req, res) => {
  const { method, query } = req;
  if (method === "GET") {
    try {
      const covers = await Covers.find({});
      //   .populate("author").populate("liked");
      res.status(200).json({ data: covers });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else if (method === "POST") {
    try {
      console.log("POST BODY", req.body);
      const cover = await Covers.create(req.body);
      res.status(200).json({ data: cover });
    } catch (error) {
      console.log("failed");
      res.status(400).json({ error: error });
    }
  } else {
    console.log("else");
    res.status(400).json({ message: "Access Denied" });
  }
};

export default CoversApi;
