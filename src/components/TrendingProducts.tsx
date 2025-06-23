import ProductCard from './ProductCard';

const TrendingProducts = () => {
  const products = [
    {
      id: 1,
      title: "Men OG Striped Regular Fit Shirt with Patch Pocket",
      brand: "NETPLAY",
      price: 385,
      originalPrice: 899,
      discount: 57,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.2,
      reviews: 156
    },
    {
      id: 2,
      title: "Women Casual Relaxed Fit Shirt",
      brand: "FYEROGLER",
      price: 299,
      originalPrice: 599,
      discount: 50,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 3.9,
      reviews: 332,
      isBestseller: true
    },
    {
      id: 3,
      title: "Men Self-Weaved Slim Fit Shirt",
      brand: "NETPLAY",
      price: 449,
      originalPrice: 999,
      discount: 55,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.1,
      reviews: 279
    },
    {
      id: 4,
      title: "Premium Cotton Blend T-Shirt",
      brand: "BASICS",
      price: 199,
      originalPrice: 399,
      discount: 50,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.5,
      reviews: 523
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-display text-3xl font-medium text-center mb-12 text-gray-800">Trending Now</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
