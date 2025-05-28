import { Router } from "express";
import { getUserController } from "../controller/userController";
const userRouter=Router()

userRouter.get('/',getUserController)

export default userRouter