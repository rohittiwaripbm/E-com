import express from 'express';
import CartController from './cart.controller.js';
let cartRouter = express.Router();
let cartController = new CartController();

// cartRouter.get('/', cartController.get);
cartRouter.get('/', (req, res)=>{
    cartController.get(req, res)
})
// cartRouter.post('/', cartController.add);
cartRouter.post('/', (req, res)=>{
    cartController.add(req, res)
})
cartRouter.delete('/:id', cartController.delete);
export default cartRouter;