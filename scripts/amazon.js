let productsHTML = ``;

products.forEach((product) => {
    productsHTML += 
    `<div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
        <select class="quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
        Add to Cart
        </button>
    </div>`;
});

let CART_TOTAL = 0;
let addedMsgTimeoutID = null;

document.querySelector(".products-grid").innerHTML = productsHTML;

document.querySelectorAll(".add-to-cart-button")
.forEach((button) => {
    button.addEventListener("click", () => {
        const productID = button.dataset.productId;

        let matchingItem;
        cart.forEach((item) => {
            if (productID == item.productID) matchingItem = item;
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

        const addedMessage = document.querySelector(`.added-to-cart-${productID}`);
        addedMessage.classList.add("addMsg");
        clearInterval(addedMsgTimeoutID);
        addedMsgTimeoutID = setTimeout(() => {
            addedMessage.classList.remove("addMsg");
        }, 2000)
    });
});