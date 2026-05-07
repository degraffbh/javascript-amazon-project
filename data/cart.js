export let cart = [{
    productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
}, {
    productID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}];

export function addToCart(productID) {
    let CART_TOTAL = 0;
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productID === cartItem.productID) matchingItem = cartItem;
    })

    const quantitySelctorValue = Number(document.querySelector(`.quantity-selector-${productID}`).value);
    if (matchingItem) {
        matchingItem.quantity += quantitySelctorValue;
    } else {
        cart.push({
            productID: productID,
            quantity: quantitySelctorValue
        })
    }

    CART_TOTAL += quantitySelctorValue;
    document.querySelector(".cart-quantity").innerHTML = CART_TOTAL;
}

export function addMessage() {
    let addedMsgTimeoutID = null;
    const addedMessage = document.querySelector(`.added-to-cart-${productID}`);
    addedMessage.classList.add("addMsg");
    clearInterval(addedMsgTimeoutID);
    addedMsgTimeoutID = setTimeout(() => {
        addedMessage.classList.remove("addMsg");
    }, 2000)
}

export function removeFromCart(productID) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productID != productID) newCart.push(cartItem);
    })
    cart = newCart;
}