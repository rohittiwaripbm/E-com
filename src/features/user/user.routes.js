import jwtAuth from "../../middlewares/jwt.middleware.js";
import UserController from "./user.controller.js";
import express from 'express';

let userRouter = express.Router();

let userController =  new UserController();
// userRouter.post('/signin',userController.signIn);
userRouter.post('/signin', (req, res)=>{userController.signIn(req, res)});
// userRouter.post('/signup', userController.signUp);
userRouter.post('/signup',(req, res)=>{userController.signUp(req, res)});

userRouter.post('/reset',jwtAuth, (req, res)=>{userController.resetPassword(req, res)});

export default userRouter;                  