import OrderRepository from "./order.repository.js";
import OrderModel from "./order.model.js";



export default class OrderController{
    constructor()
    {
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(req, res)
    {
        try {
            let userId = req.userID;
            await this.orderRepository.placeOrder(userId);
            res.status(201).send("order is created")
        } catch (error) {
            console.log(error)
            res.status(500).send("something went wrong")
        }
    }
}