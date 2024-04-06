import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";


export default class CartRepository{
    constructor(){
        this.collection = 'cartItems';
    }

    async add(productId, userId, quantity) {
        
        try {
            quantity = Number(quantity);
            console.log('came in add function in cartRepository');
            const db = getDB();
            const collection = db.collection(this.collection);
    
            // Increment the quantity of the product in the cart
            await collection.updateOne(
                { productId: new ObjectId(productId), userId: new ObjectId(userId) },
                { $inc: { quantity: quantity } }, // Increment the quantity field
                { upsert: true } // Create a new document if it doesn't exist
            );
    
            // Optionally, you can return a success message or the updated document
            return { success: true, message: 'Product quantity updated successfully' };
        } catch (error) {
            console.error('Error in add function in cartRepository:', error);
            throw new customErrorHandler(500, 'Something went wrong while updating product quantity');
        }
    }
    

    async get(userId)
    {
        try {
            let db = getDB();
            let collection = db.collection(this.collection);
            return await collection.find({userId:new ObjectId(userId)}).toArray();
            
        } catch (error) {
            console.log(error);
            throw new customErrorHandler(500, 'something went wrong with database');
        }

    }

    async delete(userId, cartItemId){
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({_id:new ObjectId(cartItemId), userId: new ObjectId(userId)});
            return result.deletedCount>0;
        } catch (error) {
            console.log(error);
            throw new customErrorHandler(500, 'something went wrong');
        }
    }

}