import { Router } from "express";
import { createOrder, } from "../controller/orderController";

const orderRouter=Router()
// orderRouter.get("/",getAllorderController)
// orderRouter.get("/:id",getOrderByIdController)
orderRouter.post("/",createOrder)
export default orderRouter