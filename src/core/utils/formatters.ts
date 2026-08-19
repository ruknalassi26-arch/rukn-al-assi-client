import { format } from "date-fns";

export function formatDate(date: string | Date, formatStr = "PPP"): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, formatStr);
}

export function formatCurrency(
  amount: number,
  currency = "SAR",
  locale = "ar-SA"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
