import { Collection, ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";
import mongoose from 'mongoose';
import { productSchema } from "./product.schema.js";
import reviewSchema from "./review.schema.js";

let ProductModel = mongoose.model('product', productSchema);
let ReviewModel = mongoose.model('review', reviewSchema);
export default class ProductRepository {
    constructor(){
        this.collection = 'products'
    }

    // async getAll() {
    //     try {
    //         const db = getDB();
    //         const collection = db.collection(this.collection);  
    //         return await collection.find().toArray();

    //     }
    //     catch(err)
    //     {
    //         throw new customErrorHandler(500, 'Something went wrong in getAll method')
    //     }

    // }
    async getAll()
    {
        try{
            let allProducts = await ProductModel.find();
            if (allProducts.length>0) {
                return allProducts;
            }
            else{
                return {
                    message:"No products in the database"
                }
            }
        }catch(error)
        {
            throw new Error(error.message);
        }
    }

    // async addProduct(product) {
    //     try {
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         await collection.insertOne(product);
    //         return product;
    //     } catch (error) {
    //         throw new customErrorHandler(500, 'something went wrong in adding product')
    //     }
    // }

    async addProduct(product)
    {
        try {
            const newProduct = new ProductModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // async getOneProduct(id) {
    //     try {
    //         const db =  getDB();
    //         const collection = db.collection(this.collection);
    //         return await collection.findOne({_id :new ObjectId(id)});
            
    //     } catch (error) {
    //         console.log("error in product Repository");
    //         console.log(error)
    //         throw new customErrorHandler(500, 'something went wrong in getting one product');
    //     }

    // }

    async getOneProduct(id)
    {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            return {
                Message:"no product with this id found "+id
            }
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
            let productToUpdate = await ProductModel.findById(productId);
            if(!productToUpdate)
            {
                throw new Error({message: "no product found"});
            }

            let ratingToChange = await ReviewModel.findOne({userId:userID,productId:productId });
            if(ratingToChange)
            {
                ratingToChange.rating = rating;
                await ratingToChange.save();
                return ratingToChange;
            }
            let newRating = new ReviewModel({userId:userID,productId:productId, rating:rating});
            await newRating.save();
            return newRating;
        }
        catch(error)
        {
            throw new customErrorHandler(500, 'not able to add ratings')
        }
    }
}