import { Router } from "express";
import { createUsersController, getUserByIdController, getUserController, updateUserController } from "../controller/userController";
const userRouter=Router()

userRouter.get('/',getUserController)
userRouter.get('/:id',getUserByIdController)
userRouter.post('/',createUsersController)
userRouter.put('/:id',updateUserController)


export default userRouter