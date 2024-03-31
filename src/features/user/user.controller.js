import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";
export default class UserController{
    constructor()
    {
        this.userRepository = new UserRepository();
    }
    signIn(req, res)
    {
        let user = UserModel.signIn(req.body.email, req.body.password);
        if(!user)
        {
            res.status(400).send('no user found');
        }
        else{
            //1.create token
            const token = jwt.sign({userID:user.id, email:user.email, name:user.name}, "EBE5C9AF48B26",{
                expiresIn:'1h',
            })
            //res.status(200).send(token);
            res.status(200).cookie("jwtToken",token,{maxAge:900000}).json({status:"success", msg:"login successful", token});
            // res.status(200).send(user);
        }
        // res.send('this is signIn controller');
    }
    async signUp(req, res)
    {
        try {
        const {name, email, password, type} = req.body;
        let user = new UserModel(name, email, password, type);
        await this.userRepository.signUp(user);
        if(!user)
        {
            res.status(401).send('not able to create new User');
        }
        else{
            res.status(200).send(user);
        }
    } 
        catch (error) {
            console.log(error)
            throw new customErrorHandler(500, 'Something went wrong in signUp method')
        }
    }
}