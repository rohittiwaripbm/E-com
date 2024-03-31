import UserController from "./user.controller.js";
import express from 'express';

let userRouter = express.Router();

let userController =  new UserController();
userRouter.post('/signin',userController.signIn);
// userRouter.post('/signup', userController.signUp);
userRouter.post('/signup',(req, res)=>{userController.signUp(req, res)});

export default userRouter;