import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (option.id == deliveryOptionId) {
            deliveryOption = option;
        }
    })

    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
    const isWeekend = (date) => {
        const day = dayjs(date).day();
        return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
    };

    let currentDate = dayjs();
    let businessDaysAdded = 0;

    while (businessDaysAdded < deliveryOption.deliveryDays) {
        currentDate = currentDate.add(1, 'day');
        if (!isWeekend(currentDate)) {
            businessDaysAdded++;
        }
    }

    const dateString = currentDate.format("dddd MMMM D");
    return dateString;
}

export const deliveryOptions = [{
    id: "1",
    deliveryDays: 7,
    priceCents: 0
}, {
    id: "2",
    deliveryDays: 3,
    priceCents: 499
}, {
    id: "3",
    deliveryDays: 1,
    priceCents: 999
}];