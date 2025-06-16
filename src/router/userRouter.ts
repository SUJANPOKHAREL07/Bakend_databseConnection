import { Router } from "express";
import { createUsersController, deleteUserController, getUserByIdController, getUserController, updateUserController } from "../controller/userController";
import { createLogin } from "../controller/LoginController/loginController";
import { logoutController } from "../controller/LoginController/logoutController";

const userRouter=Router()

userRouter.get('/',getUserController)
userRouter.get('/:id',getUserByIdController)
userRouter.post('/',createUsersController)
userRouter.put('/:id',updateUserController)
userRouter.delete('/:id',deleteUserController)
userRouter.post('/login',createLogin)
userRouter.post('/logout',logoutController)

export default userRouter