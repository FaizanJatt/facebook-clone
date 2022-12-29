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
      "https://scontent.fisb2-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=LEpdzksOwNEAX_n1JqG&_nc_ht=scontent.fisb2-1.fna&oh=00_AfAVfoHcKikC7MXWfYB1ah8sNozuK0V1ZRFBWFW4pbEllw&oe=63CD1638",
  },
});

const Users = models.Users || model("Users", UserSchema);

export default Users;
