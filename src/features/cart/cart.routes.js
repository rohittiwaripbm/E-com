import express from 'express';
import CartController from './cart.controller.js';
let cartRouter = express.Router();
let cartController = new CartController();

cartRouter.get('/', cartController.get);
cartRouter.post('/', cartController.add);
cartRouter.delete('/:id', cartController.delete);
export default cartRouter;