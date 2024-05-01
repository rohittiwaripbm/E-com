import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    productId: {type:mongoose.Schema.Types.ObjectId, ref:'product'},
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'user'}, 
    rating: Number
});

export default reviewSchema;