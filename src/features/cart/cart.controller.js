import CartModel from "./cart.model.js";
import CartRepository from "./cartRepository.js";

export default class CartController {
    constructor() {
        this.cartRepository = new CartRepository();
    }
    async get(req, res) {
         const userId = req.userID; //we stored in jwt Token in userController signin method have to change in jwtmiddleware;
        // const item = CartModel.get(userId);
        // return res.status(200).send(item);

        try {
            let cartItems = await this.cartRepository.get(userId);
            res.status(200).send(cartItems);
        } catch (error) {
            console.log(error)
            res.status(500).send('something went wrong');
        }
    }

    async add(req, res) {
        const { productId, quantity } = req.query;
        const userId = req.userID // we stored in jwt Token in userController signin method;
        try {
            await this.cartRepository.add(productId, userId, quantity);
            res.status(201).send('cart is updated');
        } catch (error) {
            console.log(error)
            res.status(500).send('something went wrong');
        }
    }
    async delete(req, res) {
        const userId = req.userID;
        const cartItemId = req.params.id;
        let deleteCount = await this.cartRepository.delete(cartItemId);
        if (deleteCount) {
            res.status(200).send('cart is removed');
        }
        else{
            res.status(404).send('something went wrong')
        }
        
        
    }
}