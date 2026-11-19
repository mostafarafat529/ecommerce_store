export function formatNumber(amount) {
  const safeValue = Number.isFinite(Number(amount)) ? Number(amount) : 0;
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(safeValue));
}

export function formatPrice(amount, suffix = 'ج.م') {
  return `${formatNumber(amount)} ${suffix}`;
}

export function formatPriceFull(amount) {
  return `${formatNumber(amount)} جنيه`;
}

export function calculateDiscountPercentage(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
