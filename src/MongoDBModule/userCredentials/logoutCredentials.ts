import sessionModal from "../sessionModal/sessionMoongoDB";
import userLogin from "./loginMongoDB";
import mongoose from "mongoose";
async function logoutUserLogin(email: string) {
  const deleteFromuser = await userLogin.deleteOne({ email });
}
async function logoutUserSession(userID: string) {
  const deleteFromSession = await sessionModal.deleteOne({ userID });
}
// async function logoutUserSession(userID: string) {
//   const objectId = new mongoose.Types.ObjectId(userID);
//   const result = await sessionModal.deleteOne({ userID: objectId });
//   console.log("Session delete result:", result);
//   return result;
// }
export { logoutUserLogin, logoutUserSession };
