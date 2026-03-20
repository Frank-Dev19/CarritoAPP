export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculateDiscount = (price, totalPrice) => {
  if (totalPrice <= 0) return 0;
  return Math.round(((totalPrice - price) / totalPrice) * 100);
};
