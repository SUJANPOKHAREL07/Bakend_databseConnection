import { Request,Response } from "express";
import { sqlUserModal } from "../sql-models/userSQLmodal";

export const getUserController=async(req:Request,res:Response)=>{
    res.status(200).json(await sqlUserModal.getAllUser())
}

export const getUserByIdController=async(req:Request,res:Response)=>{
    const id=Number(req.params.id)
    const fromid=await sqlUserModal.getUserBYId(id)
    res.status(200).json(fromid)
}

export const createUsersController=async(req:Request,res:Response)=>{
    const{name,email}=req.body;
    const data=await sqlUserModal.createUser({name,email})
    res.status(200).json(data)
}