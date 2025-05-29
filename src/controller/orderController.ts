import { Request,Response } from "express";
import { sqlOrderModal } from "../sql-models/orderSQLmodals";

export const getAllorderController=async (req:Request,res:Response)=>{
    const dataOrder= await sqlOrderModal.getAllOrder();
  res.status(200).json(dataOrder )
   
    
}