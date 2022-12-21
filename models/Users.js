import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  first: String,
  last: String,
  email: String,
  password: String,
  dob: Date,
  gender: String,
});

const Users = models.Users || model("Users", UserSchema);

export default Users;
