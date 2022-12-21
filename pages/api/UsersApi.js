import dbConnect from "../../utils/dbConnect";
import Users from "../../models/users";
import { hash } from "bcryptjs";
dbConnect();
export default async (req, res) => {
  const { method, query } = req;
  if (method === "GET") {
    try {
      const users = await Users.find({ query });
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else if (method === "POST") {
    try {
      const UserData = req.body;
      const hashedPassword = await hash(UserData.password, 12);
      console.log(await hashedPassword);
      UserData.password = hashedPassword;
      console.log(UserData);
      const user = await Users.create(UserData);
      console.log(user);
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
