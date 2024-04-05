import UserModel from "../user/user.model.js";
export default class ProductModel{
    constructor(productName, productPrice, productImage, productSize, productCategory){
        this.productName = productName;
        this.productPrice = productPrice;
        this.productImage = productImage;
        this.productSize = productSize;
        this.productCategory = productCategory;
    }

    static filterProductModel(minPrice, maxPrice, category) {
        const result = products.filter((product) => {
            return (
                (!minPrice || product.productPrice >= minPrice) &&
                (!maxPrice || product.productPrice <= maxPrice) &&
                (!category || product.productCategory == category)
            )
        });
        return result;
    }

    static rateProduct(userID, productID, rating) {
        // Validate user
        const userModel = UserModel.getAll().find(u => u.id == userID);
        if (!userModel) {
            throw new Error('User not found');
        }
    
        // Validate product
        const product = products.find(p => p.productId == productID);
        if (!product) {
            throw new Error('Product not found');
        }
    
        // Check if there are any ratings for the product
        if (!product.ratings) {
            product.ratings = [];
        }
    
        // Check if the user has already rated the product
        const existingRatingIndex = product.ratings.findIndex(r => r.userId == userID);
        if (existingRatingIndex >= 0) {
            // Update existing rating
            product.ratings[existingRatingIndex].rating = rating;
        } else {
            // Add new rating
            product.ratings.push({ userId: userID, rating: rating });
        }
    }
    
    
}

let products = [
    new ProductModel('Shirt', 500, 'https://rb.gy/zjlw45',['M', 'L', 'XL'], 'wear'),
    new ProductModel('Pant', 800, 'https://rb.gy/zjlw45',['M', 'L', 'XL'], 'wear'),
    new ProductModel('Shoes', 2000, 'https://rb.gy/zjlw45',['M', 'L', 'XL'], 'footwear'),
    new ProductModel('Computer', 50000, 'https://rb.gy/zjlw45','' ,'electronics'),
    new ProductModel('Noodles', 100, 'https://rb.gy/zjlw45', '','food'),
    new ProductModel('bed', 5000, 'https://rb.gy/zjlw45',['M', 'L', 'XL'], 'wooden'),
    new ProductModel('lower', 1500, 'https://rb.gy/zjlw45',['M', 'L', 'XL'], 'sportswear'),

]
