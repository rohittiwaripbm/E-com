import UserModel from "../user/user.model.js";
export default class ProductModel{
    constructor(productName, productPrice, productImage, productSize, productCategory){
        this.productName = productName;
        this.productPrice = productPrice;
        this.productImage = productImage;
        this.productSize = productSize;
        this.productCategory = productCategory;
    }
}

