import dbConnect from "../../../utils/dbConnect";
import Users from "../../../models/Users";
import { hash } from "bcryptjs";
dbConnect();
export default async (req, res) => {
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
  } else {
    console.log("else");
    res.status(400).json({ message: "Access Denied" });
  }
};
