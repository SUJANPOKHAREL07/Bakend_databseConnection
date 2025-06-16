import userModal from "../usersModal/userMongoDB";
import sessionModal from "./sessionMoongoDB";

async function createSession(SessionID: string, userID: string) {
  const data = new sessionModal({
    SessionID: SessionID,
    userID: userID,
    });
  return await data.save();
}
// async function getusersByEmailService(email: string) {
//   const user = await userModal.findOne({ email }).select("._id").lean();
//   return user?._id;
// }
async function getusersByEmailService(email: string) {
  const user = await userModal.findOne({ email }).select("_id").lean();
  console.log("Found user for email:", email, "==>", user); // debug log
  return user?._id;
}



export { createSession, getusersByEmailService };
