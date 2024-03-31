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