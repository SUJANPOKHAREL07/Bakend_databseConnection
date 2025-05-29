import { Router } from "express";
import { createOrderController, getAllorderController, getOrderByIdController } from "../controller/orderController";
const orderRouter=Router()
orderRouter.get("/",getAllorderController)
orderRouter.get("/:id",getOrderByIdController)
orderRouter.post("/",createOrderController)
export default orderRouter