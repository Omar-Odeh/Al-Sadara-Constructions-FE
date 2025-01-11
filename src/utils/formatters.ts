export function formatCurrency(
  amount: number,
  options?: Intl.NumberFormatOptions
) {
  const formatter = Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "ILS",
    ...options,
  });
  return formatter.format(amount);
}
