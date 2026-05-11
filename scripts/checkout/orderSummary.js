import { cart, removeFromCart, editItemQuantity, updateDeliveryOption } from "../../data/cart.js"
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js"
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryoptions.js"
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"

export function renderOrderSummary() {
    let cartSummaryHTML = ``;
    cart.forEach((cartItem) => {
        const productID = cartItem.productID;
        const matchingProduct = getProduct(productID);
        
        const deliveryOptionId = cartItem.deliveryOptionId
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
        const dateString = deliveryDate.format("dddd MMMM D");

        cartSummaryHTML +=
        `<div class="cart-item-container cart-item-container-${productID}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input">
                    <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}"> 
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>`
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = "";
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
            const dateString = deliveryDate.format("dddd MMMM D");

            const price = deliveryOption.priceCents;
            const priceString = price === 0 ? "FREE" : `$${formatCurrency(price)} - `;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html +=
            `<div class="delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>`
        });
        return html;
    }

    document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

    document.querySelectorAll(".delete-quantity-link")
    .forEach((link) => {
        link.addEventListener("click", () => {
            const productID = link.dataset.productId;
            removeFromCart(productID);

            document.querySelector(`.cart-item-container-${productID}`).remove();
        });
    });

    document.querySelectorAll(".update-quantity-link")
    .forEach((link) => {
        link.addEventListener("click", () => {
            const productID = link.dataset.productId;
            const productContainer = document.querySelector(`.cart-item-container-${productID}`);
            productContainer.classList.add("is-editing-quantity");
        });
    });

    document.querySelectorAll(".save-quantity-link")
    .forEach((link) => {
        link.addEventListener("click", () => {
            const productID = link.dataset.productId;
            const productContainer = document.querySelector(`.cart-item-container-${productID}`);
            productContainer.classList.remove("is-editing-quantity");

            editItemQuantity(productID);
        });
    });

    document.querySelectorAll(".delivery-option") 
    .forEach((option) => {
        option.addEventListener("click", () => {
            const {productId, deliveryOptionId} = option.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
        });
    });
}