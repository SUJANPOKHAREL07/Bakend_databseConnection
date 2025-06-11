import userModal from "../usersModal/userMongoDB";
import userLogin from "./loginMongoDB";



async function checkUserget(name:string,password:string){
    return await userModal.find({name,password})
}


export  {checkUserget}