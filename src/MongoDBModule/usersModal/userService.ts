import userModal from "./userMongoDB";

async function CreateUserService(name:string,email:string,password:string) {
   const create=new userModal({
    name:name,
    email:email,
    password:password,
   })
   return await create.save()
}
async function getAllUsersService() {
    return await userModal.find() 
}
async function getusersByIDService(id:string){
    return await userModal.findById(id)
}
async function deleteUserService(id:string){
    return await userModal.deleteOne({_id:id})
    
}
export {CreateUserService,getAllUsersService,getusersByIDService,deleteUserService}
