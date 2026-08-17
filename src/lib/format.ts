export function formatMoney(amount: number, currency = "RUB") {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
  }).format(amount / 100);
}