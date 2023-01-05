import dbConnect from "../../../../utils/dbConnect";
import Profile from "../../../../models/Profile";

dbConnect();
const ProfilesApi = async (req, res) => {
  const { method, query } = req;
  if (method === "GET") {
    try {
      const Profiles = await Profile.find({});
      //   .populate("author").populate("liked");
      res.status(200).json({ data: Profiles });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else if (method === "POST") {
    try {
      console.log("POST BODY", req.body);
      const profile = await Profile.create(req.body);
      res.status(200).json({ data: profile });
    } catch (error) {
      console.log("failed");
      res.status(400).json({ error: error });
    }
  } else {
    console.log("else");
    res.status(400).json({ message: "Access Denied" });
  }
};

export default ProfilesApi;
