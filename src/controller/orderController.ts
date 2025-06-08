import { NextFunction, Request, Response } from "express";
import { sqlOrderModal } from "../sql-models/orderSQLmodals";
import { sqlProductModal } from "../sql-models/productSQLmodal";
import { sqlUserModal } from "../sql-models/userSQLmodal";
import { createOrderService, getAllOrderService, getOrderByIdService,deleteOrderService, updateOrderService } from "../MongoDBModule/orderModal/orderService";

function validateOrderInput(body: any) {
  if (typeof body.userId !== "string") {
    return "userId must be a String";
  }
  if (!Array.isArray(body.productId) || body.productId.length === 0) {
    return "productIds must be a non-empty array";
  }
  // Check if user exists
  if (!sqlUserModal.getUserBYId(body.userId)) {
    return "User does not exist";
  }
  // Check if all products exist
  for (const pid of body.productId) {
    if (!sqlProductModal.getById(pid)) {
      return `Product with id ${pid} does not exist`;
    }
  }
  return null;
}

export const createOrder =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validateOrderInput(req.body);
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  try {
    // const order = sqlOrderModal.createOrder(req.body);
    const{userId,productId,quantity}=req.body
        const order =await createOrderService(userId,productId,quantity);

    console.log(order)
    res.status(201).json(order);
  } catch (err) {
    console.log("Unable to create order")
    next(err);
  }
};
export const getAllorderController=async(req:Request,res:Response)=>{
try{
const allData=  await getAllOrderService()
console.log("this is the data:",allData)
    
  res.status(200).json(allData)
}catch{
  res.status(404).json({error:"cannot fetch the data"})
}
  
}
export const getOrderByIDController=async(req:Request,res:Response)=>{
 try{
//  const orderID=Number(req.params.id);
 const idorder=await getOrderByIdService(req.params.id)
  res.status(200).json(idorder)
 }
 catch{
  res.status(404).json({error:"unabole to find the order requested"})
 }
}
export const updateOrderController=async(req:Request,res:Response)=>{
 try{ const id=req.params.id;
  console.log("this is orderid",id)
  const {productId,quantity,userId}=req.body;
  console.log("this is productid",productId)
  const updated=await updateOrderService(id,req.body)
  console.log(updated)
  res.status(200).json(updated)}
  catch{
  res.status(404).json("unable to connect")
  }
}

export const deleteOrderByController=async(req:Request,res:Response)=>{
  // const id=Number(req.params.id)
   const datatTobeDeleted= await getOrderByIdService(req.params.id)
  res.json(datatTobeDeleted)
   try{ 
 const data= await deleteOrderService(req.params.id)
 console.log(data)
res.status(200).json("Deleted the data")}
catch{
  res.status(404).json("unable to delete order data")
}

}