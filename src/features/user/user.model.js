import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";

export default class UserModel{
    
    constructor( name, email, password, type)
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static signIn(email, password)
    {
        console.log(email)
        let user = users.find(u=>u.email==email && u.password ==  password);

        return user;
    }

    static async signUp(name, email, password, type)
    {
        try {
            //1. Get the database
            const db = getDB();

            //2. Get the collection
            const collection = db.collection("users");
            let newUser = new UserModel(name, email, password, type);
            await collection.insertOne(newUser);
            return newUser;


            
        } catch (error) {
            throw new customErrorHandler(500, "Something is not working fine");
        }
    }
    static getAll()
    {
        return users;
    }

}

let users =[
    new UserModel('saller', 'saller@gmail.com', 'pass', 'saller'),
    new UserModel('customer', 'customer@gmail.com', 'pass', 'customer'),
    new UserModel('customer1', 'customer1@gmail.com', 'pass', 'customer'),


]