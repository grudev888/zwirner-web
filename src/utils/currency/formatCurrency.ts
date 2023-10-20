const CURRENCY_TO_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  HKD: '$',
} as const
export const formatCurrency = (currency: keyof typeof CURRENCY_TO_SYMBOLS, amount: number) => {
  return `${CURRENCY_TO_SYMBOLS[currency] || '$'}${amount.toFixed(2)} ${currency}`
}
