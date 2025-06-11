import { Router } from "express";
import { createUsersController, deleteUserController, getUserByIdController, getUserController, updateUserController } from "../controller/userController";
import { createLogin } from "../controller/LoginController/loginController";

const userRouter=Router()

userRouter.get('/',getUserController)
userRouter.get('/:id',getUserByIdController)
userRouter.post('/',createUsersController)
userRouter.put('/:id',updateUserController)
userRouter.delete('/:id',deleteUserController)
userRouter.post('/login',createLogin)

export default userRouter