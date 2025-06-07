import { Request,Response } from "express";
import { sqlUserModal } from "../sql-models/userSQLmodal";
import { CreateUserService, deleteUserService, getAllUsersService, getusersByIDService } from "../MongoDBModule/usersModal/userService";

export const getUserController=async(req:Request,res:Response)=>{
    res.status(200).json(await getAllUsersService())
}

export const getUserByIdController=async(req:Request,res:Response)=>{
    const id=req.params.id
    const fromid=await getusersByIDService(id)
    res.status(200).json(fromid)
}

export const createUsersController=async(req:Request,res:Response)=>{
   
   try{
    const{name,email,password}=req.body
    const userdata=await CreateUserService(name,email,password)
 
    console.log(userdata)
    res.status(200).json(userdata)
   }
   catch{
    res.status(404).json("Unable to store the new data")
   }
}

export const updateUserController=async(req:Request,res:Response)=>{
    const id=Number(req.params.id);
    const {name,email}=req.body
    
    const data=await sqlUserModal.UpdateUser(id,{name,email})
    res.status(200).json(data)

}
export const deleteUserController=async(req:Request,res:Response)=>{
const id=req.params.id
// console.log(id)
const abouttodelete=await getusersByIDService(id)
console.log("the deleted data:",abouttodelete)
await deleteUserService(id)
res.status(200).json({message:"Deletd Successfuly"})

}