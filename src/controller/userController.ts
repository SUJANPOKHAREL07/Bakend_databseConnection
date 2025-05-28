import { Request,Response } from "express";
import { sqlUserModal } from "../sql-models/userSQLmodal";

export const getUserController=async(req:Request,res:Response)=>{
    res.status(200).json(await sqlUserModal.getAllUser())
}