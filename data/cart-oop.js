const cart = {
    cartItems: undefined,
    CART_TOTAL: 0,
    addedMsgTimeoutID: null,

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem("cart-oop"))
        if (!this.cartItems) {
            this.cartItems = [{
                productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: "1"
            }, {
                productID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "2"
            }];
        }
    },

    saveToStorage() {
        localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
    },

    calculateCartQuantity() {
        this.CART_TOTAL = 0;
        this.cartItems.forEach((cartItem) => {
            this.CART_TOTAL += cartItem.quantity;
        });
    },

    getCartQuantity() {
        this.calculateCartQuantity();
        return this.CART_TOTAL;
    },

    updateCartDisplay() {
        this.calculateCartQuantity();

        const cartQuantityElement = document.querySelector(".cart-quantity");
        const returnLinkElement = document.querySelector(".return-to-home-link");
        
        if (cartQuantityElement) {
            cartQuantityElement.innerHTML = this.CART_TOTAL;
        }
        if (returnLinkElement) {
            returnLinkElement.innerHTML = this.CART_TOTAL;
        }
    },

    addToCart(productID) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productID === cartItem.productID) matchingItem = cartItem;
        });

        const quantitySelctorValue = Number(document.querySelector(`.quantity-selector-${productID}`).value);
        if (matchingItem) {
            matchingItem.quantity += quantitySelctorValue;
        } else {
            this.cartItems.push({
                productID: productID,
                quantity: quantitySelctorValue,
                deliveryOptionId: "1"
            })
        }

        this.CART_TOTAL += quantitySelctorValue;
        this.updateCartDisplay();
        this.saveToStorage();
    },

    addMessage(productID) {
        const addedMessage = document.querySelector(`.added-to-cart-${productID}`);
        addedMessage.classList.add("addMsg");
        clearInterval(this.addedMsgTimeoutID);
        this.addedMsgTimeoutID = setTimeout(() => {
            addedMessage.classList.remove("addMsg");
        }, 2000)
    },

    removeFromCart(productID) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productID != productID) newCart.push(cartItem);
        });
        this.cartItems = newCart;

        this.calculateCartQuantity();
        this.updateCartDisplay();
        this.saveToStorage();
    },

    editItemQuantity(productID, newQuantity) {
        const newQuantityValue = Number(newQuantity || 0);
        if (newQuantityValue > 0) {
            this.cartItems.forEach((item) => {
                if (item.productID == productID) item.quantity = newQuantityValue;
            });

            this.updateCartDisplay();
            this.saveToStorage();
        }
    },

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productID) matchingItem = cartItem;
        });

        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
};

cart.loadFromStorage();
cart.updateCartDisplay();