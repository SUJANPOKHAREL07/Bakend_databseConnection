import { Request, Response } from "express";
import { sqlOrderModal } from "../sql-models/orderSQLmodals";

export const getAllorderController = async (req: Request, res: Response) => {
  const dataOrder = await sqlOrderModal.getAllOrder();
  res.status(200).json(dataOrder);
};
export const getOrderByIdController=async(req:Request,res:Response)=>{
    const id=Number(req.params.id)
    const dataOrder=await sqlOrderModal.getOrderById(id)
    res.status(200).json(dataOrder)
}
export const createOrderController=async(req:Request,res:Response)=>{
      let { userid } = req.body;

  // Convert string to number safely
  userid = Number(userid);

  if (!userid || isNaN(userid)) {
    return res.status(400).json({ error: "Invalid or missing userid" });
  }

  try {
    const dataOrder = await sqlOrderModal.createOrder(userid);
    console.log("Inserted userId:", userid);
    res.status(200).json({ success: true, data: dataOrder });
  } catch (error) {
    console.error("Error inserting order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
