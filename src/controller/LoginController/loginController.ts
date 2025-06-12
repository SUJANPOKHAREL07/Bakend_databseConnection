import { Request, Response } from "express";
import { checkUserget, storeLoginDetailsService } from "../../MongoDBModule/userCredentials/loginCredentials";


export const createLogin=async(req:Request,res:Response)=>{
  try{
    
    const {name,password}=req.body
 
   const getLogindetails = await checkUserget(name, password);
   console.log(getLogindetails);
  
   if (getLogindetails && getLogindetails.length > 0) {
    
     const saveLogindata=await storeLoginDetailsService(name,password)
    res.status(200).json(saveLogindata)
  
   
     res.status(200).json("Logged in");
   } else {
     res.status(401).json("Invalid credentials");
   }
  
  } catch {
    res.json("Unable to login");
  }
}