import { Router } from "express";
import { createUsersController, getUserByIdController, getUserController } from "../controller/userController";
const userRouter=Router()

userRouter.get('/',getUserController)
userRouter.get('/:id',getUserByIdController)
userRouter.post('/',createUsersController)

export default userRouter