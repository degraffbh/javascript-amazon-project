export let cart = JSON.parse(localStorage.getItem("cart"))
if (!cart) {
    cart = [{
        productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    }, {
        productID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }];
}
let CART_TOTAL = 0;

function calculateCartQuantity() {
    CART_TOTAL = 0;
    cart.forEach((cartItem) => {
        CART_TOTAL += cartItem.quantity;
    });
}

function saveToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartQuantityElement = document.querySelector(".cart-quantity");
    const returnLinkElement = document.querySelector(".return-to-home-link");
    
    if (cartQuantityElement) {
        cartQuantityElement.innerHTML = CART_TOTAL;
    }
    if (returnLinkElement) {
        returnLinkElement.innerHTML = CART_TOTAL;
    }
}

calculateCartQuantity();
updateCartDisplay();

export function addToCart(productID) {
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
    updateCartDisplay();
    saveToStorage();
}

let addedMsgTimeoutID = null;
export function addMessage(productID) {
    const addedMessage = document.querySelector(`.added-to-cart-${productID}`);
    addedMessage.classList.add("addMsg");
    clearInterval(addedMsgTimeoutID);
    addedMsgTimeoutID = setTimeout(() => {
        addedMessage.classList.remove("addMsg");
    }, 2000)
}

export function removeFromCart(productID) {
    const newCart = [];
    let quantityToRemove = 0;
    cart.forEach((cartItem) => {
        if (cartItem.productID != productID) newCart.push(cartItem);
        if (cartItem.productID == productID) quantityToRemove = cartItem.quantity;
    })
    cart = newCart;

    CART_TOTAL -= quantityToRemove;
    updateCartDisplay();
    saveToStorage();
}