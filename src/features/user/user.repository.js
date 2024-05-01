//1. get the model, model comes from Schema
import mongoose from 'mongoose'
import { userSchema } from './user.schema.js'
import { customErrorHandler } from '../../middlewares/errorhandler.middleware.js';


//creating model from schema
const UserModel = mongoose.model('user', userSchema)

export default class UserRepository {
    async signUp(user) {
        try {
            //create Instence of model
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (error) {
            console.log('something went wrong in userRepository Signup Method:- ', error.message);
            // throw new customErrorHandler(401, error.message)
        }

    }

    async signIn(email, password) {
        try {
            return await UserModel.findOne({email, password})
        } catch (error) {
            console.log('something went wrong in signIN in userRepository : ', error.message)
        }
    }

    async findByEmail(email)
    {
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            console.log('something went wrong in findByEmail in userRepository: ', error.message)
        }
    }

    async resetPassword(userId, newPassword)
    {
        try {
            let user = await UserModel.findById(userId);
            if(user)
            {
                user.password = newPassword;
                await user.save();
            }
            else{
                throw new Error('user not found');
            }
        } catch (error) {
            throw new Error('something went wrong in resetPassword');
        }
    }
}