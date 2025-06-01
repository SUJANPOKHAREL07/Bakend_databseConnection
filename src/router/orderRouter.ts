import { Router } from "express";
import { createOrder, getAllorderController, getOrderByIDController } from "../controller/orderController";

const orderRouter=Router()
orderRouter.get("/",getAllorderController)
orderRouter.get("/:id",getOrderByIDController)
orderRouter.post("/",createOrder)
export default orderRouter