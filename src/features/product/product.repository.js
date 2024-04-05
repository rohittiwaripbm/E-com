import { ObjectId } from "mongodb";
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

    async rate(userID, productId, rating)
    {
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.updateOne({
                _id:new ObjectId(productId)
            }, {$push:{rating:{userID, rating}}});
        }
        catch(error)
        {
            throw new customErrorHandler(500, 'not able to add ratings')
        }
    }


}