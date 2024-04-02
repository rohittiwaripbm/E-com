import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";
import bcrypt, { hash } from 'bcrypt';
export default class UserController{
    constructor()
    {
        this.userRepository = new UserRepository();
    }
    async signIn(req, res)
    {
        try{
            let {email} = req.body;
            let user = await this.userRepository.findByEmail(email);
        if(!user)
        {
            res.status(400).send('no user found');
        }
        else{
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result)
            {
            //1.create token
            console.log(user)
            console.log(user._id)
            const token = jwt.sign({userID:user._id, email:user.email, name:user.name}, process.env.JWT_SECRET,{
                expiresIn:'1h',
            })
            //res.status(200).send(token);
            res.status(200).cookie("jwtToken",token,{maxAge:900000}).json({status:"success", msg:"login successful", token});
            // res.status(200).send(user);
        }
        else{
            res.status(201).send('Invalid password');
        }
        }
    }
    catch(error)
    {
        throw new customErrorHandler(500, 'something went wrong please try  again later');
    }
        // res.send('this is signIn controller');
    }
    async signUp(req, res)
    {
        try {
        const {name, email, password, type} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        let user = new UserModel(name, email, hashedPassword, type);
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