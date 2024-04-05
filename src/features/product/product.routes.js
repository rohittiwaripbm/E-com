import express from 'express';
import ProductController from './product.controller.js';
import { uploads } from '../../middlewares/fileupload.middleware.js';
const productRouter = express.Router();

let productController = new ProductController();

productRouter.get('/',(req, res)=>{
    productController.getAllProduct(req, res);
} );
productRouter.post('/',uploads.single('imageUrl'),(req, res)=>{
    productController.addProduct(req, res)
} );
productRouter.get('/filter',(req, res)=>{
    productController.filterProduct(req, res);
} )
productRouter.post('/rate', (req, res)=>{productController.rateProduct(req, res)});
productRouter.get('/:id',(req, res)=>{productController.getOneProduct(req, res)});

export default productRouter;