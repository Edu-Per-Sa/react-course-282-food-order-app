
export function formattingPrice (price) {
    return Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);
};