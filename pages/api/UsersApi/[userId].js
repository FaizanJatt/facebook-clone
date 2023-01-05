import dbConnect from "../../../utils/dbConnect";
import Users from "../../../models/Users";
import { hash } from "bcryptjs";
dbConnect();
const usersIdApi = async (req, res) => {
  const { method, query } = req;
  if (method === "GET") {
    try {
      console.log("GETTING");

      const userId = query.userId;
      const users = await Users.find({ _id: userId });
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else if (method === "PUT") {
    console.log("METHOD IS PUT");
    const updatedImg = req.body;
    try {
      const userId = query.userId;
      const users = await Users.find({ _id: userId });
      const currentUser = users[0];
      currentUser.avatarImg = updatedImg;
      console.log(currentUser);
      const update = await Users.findOneAndUpdate({ _id: userId }, currentUser);
      res.status(200).json({ data: update });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else {
    console.log("else");
    res.status(400).json({ message: "Access Denied" });
  }
};
export default usersIdApi;
