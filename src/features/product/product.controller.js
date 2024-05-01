import { customErrorHandler } from "../../middlewares/errorhandler.middleware.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository();
    }
    async getAllProduct(req, res) {
        try {
            console.log('came in getAll product method');
            console.log('data comming from payloads from jwt tokens  - ' + req.userID + ' - ' + req.userEmail);
            let product = await this.productRepository.getAll();
            
            // let products = ProductModel.getAllProducts();
            res.status(200).send(product)
        } catch (error) {
            res.status(500).send('something went wrong');
        }

    }

    async addProduct(req, res) {
        console.log('inside add products');
        console.log(req.body);
        // const { productName, productPrice, productSize, productCategory } = req.body;
        const {name, price, category, description, inStock} = req.body;
        let imageUrl = req.file.filename;
        const newProduct = {
            name,
            price, 
            category,
            description,
            image:imageUrl,
            inStock
        }

        const createdProduct = await this.productRepository.addProduct(newProduct);
        res.status(201).send(createdProduct);
    }

    async rateProduct(req, res) {
        try {
            const userId = req.userID;
            const productId = req.query.productId;
            const rating = req.query.rating;

            await this.productRepository.rate(userId, productId, rating);
            res.status(201).send('rating added successfully');
        } catch (error) {
            console.log(error)
            throw new customErrorHandler(500, 'Not able to add rating')
        }


    }

    async getOneProduct(req, res) {
        try {
            let id = req.params.id;
            let product = await this.productRepository.getOneProduct(id);
            // let product=ProductModel.getOneProduct(id);
            if (!product) {
                return res.status(404).send('no product found');
            }
            else {
                return res.status(200).send(product);
            }
        } catch (error) {
            console.log(error);
            res.send('something bad happened');
            // throw new customErrorHandler(500, 'something went wrong')
        }

    }

    async filterProduct(req, res) {
        // throw new customErrorHandler(500, 'something went wrong in filter product');
        try {

            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            console.log(req.query);
            // dsf
            const result = await this.productRepository.filter(minPrice, maxPrice, category);
            console.log(result);
            res.status(200).send(result);
        } catch (error) {
            throw new customErrorHandler(500, 'something went wrong in filter product')
        }

    }
}