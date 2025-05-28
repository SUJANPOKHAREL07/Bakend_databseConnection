import { Router } from "express";
import { getUserByIdController, getUserController } from "../controller/userController";
const userRouter=Router()

userRouter.get('/',getUserController)
userRouter.get('/:id',getUserByIdController)

export default userRouter