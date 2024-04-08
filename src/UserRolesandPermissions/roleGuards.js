import { getDB } from "../config/mongodb.js";
import { Collection, ObjectId } from "mongodb";

const adminGuard=async(req, res, next)=>
{
    console.log('came in adminGuard');
    
    try {
        console.log(req.userID)
        console.log(typeof req.userID);
        if (!req?.userID?.length>0) {
            res.status(404).send('something went wrong');
        }
        const db = getDB();
        let collection = await db.collection('users');
        const user= await collection.findOne({_id:new ObjectId(req.userID)});
        console.log(user);
        if(!user)
        {
            res.send('something went wrong userId not found');
        }
        console.log('userRole', req.userRole);
        // const userRole = user.
        
        if(req.userRole === 'saller')
        {

            return next();
        }
        res.send('invalid access')

    } catch (error) {
        console.log(error.message);
        res.send('soemthing went wrong')
    }
}

export default adminGuard;