import mongoose,{Schema} from 'mongoose'

export const productSchema = new mongoose.Schema({
    name:String, 
    price:Number,
    category:String, 
    description:String, 
    image:String, 
    inStock:Number,
    // reviews:[
    //     {type:mongoose.Schema.Types.ObjectId, ref:'review'}
    // ]
});