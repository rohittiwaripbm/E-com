import CartModel from "./cart.model.js";

export default class CartController{
    get(req, res)
    {
        const userId = req.userID; //we stored in jwt Token in userController signin method have to change in jwtmiddleware;
        const item = CartModel.get(userId);
        return res.status(200).send(item);
    }

    add(req, res)
    {
        const {productId, quantity} = req.query;
        const userId = req.userID // we stored in jwt Token in userController signin method;
        CartModel.add(productId, userId, quantity);
        res.status(201).send('cart is updated');
    }
    delete(req, res)
    {
        const userId = req.userID;
        const cartItemId = req.params.id;
        let error = CartModel.delete(cartItemId, userId);
        if(error)
        {
            res.status(404).send(error)
        }
        res.status(200).send('cart is removed');
    }
}