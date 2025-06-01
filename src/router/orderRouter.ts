import { Router } from "express";
import { createOrder, getAllorderController } from "../controller/orderController";

const orderRouter=Router()
orderRouter.get("/",getAllorderController)
// orderRouter.get("/:id",getOrderByIdController)
orderRouter.post("/",createOrder)
export default orderRouter