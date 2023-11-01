import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  first: String,
  last: String,
  email: String,
  password: String,
  dob: Date,
  gender: String,
  registrationDate: {
    type: Date,
    default: Date.now(),
  },
  avatarImg: {
    type: String,
    default:
      "https://res.cloudinary.com/dguei52eb/image/upload/v1698829205/pfp_lxjws1.png",
  },
});

const Users = models.Users || model("Users", UserSchema);

export default Users;
