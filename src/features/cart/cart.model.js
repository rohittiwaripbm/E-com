export default class CartModel{
    constructor(productId, userId, quantity, id)
    {
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = id;
    }
    static add(productId, userId, quantity)
    {
        let cartItem = new CartModel(productId, userId, quantity);
        cartItem.id = cartItems.length+1;
        cartItems.push(cartItem);
        return cartItem;
    }
    static get(userId)
    {
        console.log(userId)
        return cartItems.filter(i=>i.userId==userId);
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

let cartItems = [new CartModel(1, 2, 3, 1),
    new CartModel(2,2,4,2)
]