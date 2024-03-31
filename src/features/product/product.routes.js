import express from 'express';
import ProductController from './product.controller.js';
import { uploads } from '../../middlewares/fileupload.middleware.js';
const productRouter = express.Router();

let productController = new ProductController();

productRouter.get('/', productController.getAllProduct);
productRouter.post('/',uploads.single('imageUrl'), productController.addProduct);
productRouter.get('/filter', productController.filterProduct);
productRouter.post('/rate', productController.rateProduct);
productRouter.get('/:id',productController.getOneProduct);

export default productRouter;