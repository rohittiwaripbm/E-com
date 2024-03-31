import UserModel from "../user/user.model.js";
export default class ProductModel{
    constructor(productId, productName, productPrice, productImage, productSize, productCategory){
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productImage = productImage;
        this.productSize = productSize;
        this.productCategory = productCategory;
    }
    static getAllProducts()
    {
        return products;
    }
    static addProduct(product)
    {
        // product.productId = products.length+1;
        let newProduct = new ProductModel(products.length+1,product.productName,product.productPrice,product.imageUrl,product.productSize,product.productCategory);
        products.push(newProduct);
        return newProduct;
    }
    static getOneProduct(id)
    {
        let product = products.find((i) => i.productId == id);
        // console.log(product);
        return product;
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
    new ProductModel(1,'Shirt', 500, 'https://rb.gy/zjlw45',['M', 'L', 'XL'], 'wear'),
    new ProductModel(2,'Pant', 800, 'https://rb.gy/zjlw45',['M', 'L', 'XL'], 'wear'),
    new ProductModel(3,'Shoes', 2000, 'https://rb.gy/zjlw45',['M', 'L', 'XL'], 'footwear'),
    new ProductModel(4,'Computer', 50000, 'https://rb.gy/zjlw45','' ,'electronics'),
    new ProductModel(5,'Noodles', 100, 'https://rb.gy/zjlw45', '','food'),
    new ProductModel(6,'bed', 5000, 'https://rb.gy/zjlw45',['M', 'L', 'XL'], 'wooden'),
    new ProductModel(7,'lower', 1500, 'https://rb.gy/zjlw45',['M', 'L', 'XL'], 'sportswear'),

]
