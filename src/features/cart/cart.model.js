export default class CartModel{
    constructor(productId, userId, quantity)
    {
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
    }
    
    static delete(cartItemId,userId)
    {
        const cartItemIndex = cartItems.findIndex(c=>c.id==cartItemId && c.userId==userId);
        if (cartItemIndex== -1) {
            return 'Item not found';
        }
        else{
            cartItems.splice(cartItemIndex,1);
            
        }
    }
}

