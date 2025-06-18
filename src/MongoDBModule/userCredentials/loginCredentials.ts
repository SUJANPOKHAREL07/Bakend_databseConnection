import userModal from "../usersModal/userMongoDB";
import userLogin from "./loginMongoDB";

async function storeLoginDetailsService(email: string, password: string) {
  const login = new userLogin({
    email: email,
    passwowrd: password,
  });
  return await login.save();
}
async function checkUserFromLogin(email: string) {
  return await userLogin.find({ email });
}

async function checkUserEmail(email: string) {
  return await userModal.find({ email});
  
}
async function checkUserPassword(paswwrod: string) {
  return await userModal.find({ paswwrod});}
export { checkUserEmail, storeLoginDetailsService, checkUserFromLogin,checkUserPassword };
