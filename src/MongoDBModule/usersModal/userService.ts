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
async function updateUserService(data:{id:string,name:string,email:string,password:string}){
    const updateFields:any={}
    if(data.name!==undefined) updateFields.name=data.name
    if(data.email!==undefined) updateFields.email=data.email
    if(data.password!==undefined) updateFields.password=data.password

    return await userModal.findByIdAndUpdate(
        {_id:data.id},
      {  $set:updateFields},
      {new:true}
    )
}
export {CreateUserService,getAllUsersService,getusersByIDService,deleteUserService,updateUserService}
