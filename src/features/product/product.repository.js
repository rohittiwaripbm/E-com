import { Collection, ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";


export default class ProductRepository {
    constructor(){
        this.collection = 'products'
    }

    async getAll() {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find().toArray();

        }
        catch(err)
        {
            throw new customErrorHandler(500, 'Something went wrong in getAll method')
        }

    }

    async addProduct(product) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(product);
            return product;
        } catch (error) {
            throw new customErrorHandler(500, 'something went wrong in adding product')
        }
    }

    async getOneProduct(id) {
        try {
            const db =  getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id :new ObjectId(id)});
            
        } catch (error) {
            console.log("error in product Repository");
            console.log(error)
            throw new customErrorHandler(500, 'something went wrong in getting one product');
        }

    }

    async filter(minPrice, maxPrice, category)
    {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression = {};
            if(minPrice)
            {
                filterExpression.productPrice={$gte: parseFloat(minPrice)}
            }
            if(maxPrice)
            {
                filterExpression.productPrice={...filterExpression.price, $lte:parseFloat(maxPrice)}
            }
            if(category)
            {
                filterExpression.productCategory = category
            }
            return  await collection.find(filterExpression).toArray();
        } catch (error) {
            console.log(error)
            throw new customErrorHandler(500, 'something went wrong in product repository');
        }
    }

    // async rate(userID, productId, rating)
    // {
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         //1. Find the product
    //         const product = await collection.findOne({_id:new ObjectId(productId)});

    //         //2. Find the rating of that product
    //         const userRating = await product?.rating?.find(r=>r.userID==userID);
    //         if (userRating) {
    //             //3. update rating according to that
    //             await collection.updateOne({_id:new ObjectId(productId), "rating.userID": new ObjectId(userID)},{
    //                 $set:{
    //                     "rating.$.rating":rating
    //                 }
    //             })
    //         } else {
    //             await collection.updateOne({
    //                 _id:new ObjectId(productId)
    //             }, {$push:{rating:{userID: new ObjectId(userID), rating}}});
    //         }

    //     }
    //     catch(error)
    //     {
    //         throw new customErrorHandler(500, 'not able to add ratings')
    //     }
    // }


    //Avoiding Race condition

    async rate(userID, productId, rating)
    {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            //atomic operations 
            //either both run or no method run
            //1. Removing existing entry

            await collection.updateOne({
                _id:new ObjectId(productId)
            },{$pull:{rating:{userID:new ObjectId(userID)}}})
            //2. Adding new Entry
            await collection.updateOne({
                _id:new ObjectId(productId)
            }, {$push:{rating:{userID: new ObjectId(userID), rating}}});

        }
        catch(error)
        {
            throw new customErrorHandler(500, 'not able to add ratings')
        }
    }
}