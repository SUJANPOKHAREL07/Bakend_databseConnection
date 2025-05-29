import { Router } from "express";
import { getAllorderController } from "../controller/orderController";
const orderRouter=Router()
orderRouter.get("/",getAllorderController)
export default orderRouter