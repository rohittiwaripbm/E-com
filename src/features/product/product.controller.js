import ProductModel from "./product.model.js";
export default class ProductController{
    getAllProduct(req, res)
    {
        console.log('came in getAll product method');
        console.log('data comming from payloads from jwt tokens  - '+req.userID+' - ' + req.userEmail);
        let products = ProductModel.getAllProducts();
        res.status(200).send(products)
    }

    addProduct(req, res)
    {
        console.log('inside add products');
        console.log(req.body);
        const{productName,productPrice,productSize,productCategory } = req.body;
        const newProduct = {
            productName,
            productPrice : parseFloat(productPrice),
            productSize : productSize.split(','),
            imageUrl : req.file.filename,
            productCategory
        }
        const createdProduct = ProductModel.addProduct(newProduct);
        res.status(201).send(createdProduct);
    }

    rateProduct(req, res)
    {
        const userId = req.query.userId;
        const productId = req.query.productId;
        const rating = req.query.rating;

        const error = ProductModel.rateProduct(userId, productId, rating);
        if(error)
        {
            return res.status(400).send(error);
        }
        else{
        return res.status(200).send('successfully updated');

        }
    }

    getOneProduct(req, res)
    {
        let id = req.params.id;
        let product=ProductModel.getOneProduct(id);
        if(!product)
        {
            return res.status(404).send('no product found');
        }
        else{
            return res.status(200).send(product);
        }
    }

    filterProduct(req, res)
    {
        console.log('came in filter')
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        console.log(req.query);
        const result = ProductModel.filterProductModel(minPrice, maxPrice, category);
        console.log(result);
        res.status(200).send(result);
    }
}