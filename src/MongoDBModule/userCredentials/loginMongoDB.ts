import { Schema } from "mongoose";
import mongoose from "../mogodbClient";
const userLoginCheck = new Schema({
  email: { type: String, require: true, unique: true },
  passwowrd: { type: String, require: true },
});
const userLogin = mongoose.model("UserLoginData", userLoginCheck);
export default userLogin;
