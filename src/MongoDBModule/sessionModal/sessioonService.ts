import userModal from "../usersModal/userMongoDB";
import sessionModal from "./sessionMoongoDB";

async function createSession(token: string, userID: string) {
  const data = new sessionModal({
    token: token,
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
async function getToken(input: { token: string }) {
  const token = await sessionModal.findOne({
    token: input.token,
  });
  return token;
}


export { createSession, getusersByEmailService,getToken };
