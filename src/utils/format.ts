export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDiscount = (originalPrice: number, price: number): number => {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatReviews = (reviews: number): string => {
  if (reviews >= 1000) {
    return `${(reviews / 1000).toFixed(1)}k`;
  }
  return reviews.toString();
}; 