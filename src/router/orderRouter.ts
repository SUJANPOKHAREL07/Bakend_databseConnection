import { Router } from "express";
import { getAllorderController, getOrderByIdController } from "../controller/orderController";
const orderRouter=Router()
orderRouter.get("/",getAllorderController)
orderRouter.get("/:id",getOrderByIdController)
export default orderRouter