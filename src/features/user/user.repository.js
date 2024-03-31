import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";
import UserModel from "./user.model.js";

export default class UserRepository {
    async signUp(newUser) // call this function from our controller
    {
        try {
            //1. Get the database
            const db = getDB();

            //2. Get the collection
            const collection = db.collection("users");
            // let newUser = new UserModel(name, email, password, type);
            await collection.insertOne(newUser);
            return newUser;



        } catch (error) {
            throw new customErrorHandler(500, "Something is not working fine");
        }
    }
    
}