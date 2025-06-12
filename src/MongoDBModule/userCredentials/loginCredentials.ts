import userModal from "../usersModal/userMongoDB";
import userLogin from "./loginMongoDB";

async function storeLoginDetailsService(name:string,password:string){
  const login=new userLogin({
    name:name,
    passwowrd:password
  })
  return await login.save()
}

async function checkUserget(name:string,password:string){
    return await userModal.find({name,password})
}


export  {checkUserget,storeLoginDetailsService}