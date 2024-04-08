import express from 'express'

let orderRouter = express.Router();

import OrderController from './order.controller.js';

let orderController = new OrderController();

orderRouter.post('/', (req, res)=>{orderController.placeOrder(req, res)});

export default orderRouter;