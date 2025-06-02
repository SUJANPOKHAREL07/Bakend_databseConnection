import { Router } from "express";
import { createOrder, deleteOrderByController, getAllorderController, getOrderByIDController, updateOrderController } from "../controller/orderController";

const orderRouter=Router()
orderRouter.get("/",getAllorderController)
orderRouter.get("/:id",getOrderByIDController)
orderRouter.post("/",createOrder)
orderRouter.put("/:id",updateOrderController)
orderRouter.delete("/:id",deleteOrderByController)
export default orderRouter