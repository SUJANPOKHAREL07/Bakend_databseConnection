import { Router } from "express";
import { createOrder, deleteOrderByController, getAllorderController, getOrderByIDController, updateOrderController } from "../controller/orderController";
import { authmMiddleware } from "../tokens/auth-middleware";

const orderRouter=Router()
orderRouter.get("/",getAllorderController)
orderRouter.get("/:id",getOrderByIDController)
orderRouter.post("/",authmMiddleware,createOrder)
orderRouter.put("/:id",updateOrderController)
orderRouter.delete("/:id",deleteOrderByController)
export default orderRouter