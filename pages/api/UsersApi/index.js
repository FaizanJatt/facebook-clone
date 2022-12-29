import dbConnect from "../../../utils/dbConnect";
import Users from "../../../models/users";
import { hash } from "bcryptjs";
dbConnect();
export default async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    try {
      const users = await Users.find({});
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else if (method === "POST") {
    try {
      const UserData = req.body;
      const hashedPassword = await hash(UserData.password, 12);
      UserData.password = hashedPassword;
      const user = await Users.create(UserData);
      res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "failed" });
    }
  } else {
    console.log("else");
    res.status(400).json({ message: "Access Denied" });
  }
};
