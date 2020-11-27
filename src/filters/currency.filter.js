export default function currencyFilter(value, curr = "RUB") {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: curr
    }).format(value)
}