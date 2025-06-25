import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Search, TrendingUp, Tag, Percent } from 'lucide-react';
import { useAuth } from '@/store/AppContext';
import AuthDialog from '@/components/AuthDialog';

// Export the products array
export const products = [
  {
    id: 'shirt1',
    title: "Classic Striped Shirt",
    brand: "NETPLAY",
    price: 385,
    originalPrice: 899,
    discount: 57,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.2,
    reviews: 156,
    isBestseller: true,
    tags: ["Formal", "Cotton"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A classic striped shirt for all occasions.',
    features: ['Regular fit', 'Breathable cotton', 'Button-down collar']
  },
  {
    id: 'shirt2',
    title: "Relaxed Fit Shirt",
    brand: "FYEROGLER",
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 3.9,
    reviews: 332,
    tags: ["Casual", "Linen"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A relaxed fit shirt for everyday comfort.',
    features: ['Relaxed fit', 'Soft fabric', 'Versatile style']
  },
  {
    id: 'shirt3',
    title: "Slim Fit Weaved Shirt",
    brand: "NETPLAY",
    price: 449,
    originalPrice: 999,
    discount: 55,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.1,
    reviews: 279,
    isBestseller: true,
    tags: ["Slim Fit", "Cotton"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A slim fit shirt with a modern weaved pattern.',
    features: ['Slim fit', 'Textured weave', 'Modern look']
  },
  {
    id: 'shirt4',
    title: "Classic Striped Shirt",
    brand: "NETPLAY",
    price: 385,
    originalPrice: 899,
    discount: 57,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.2,
    reviews: 156,
    tags: ["Formal", "Polyester"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A classic striped shirt perfect for formal occasions.',
    features: ['Regular fit', 'Wrinkle-resistant', 'Professional look']
  },
  // --- Additional items for each tag ---
  {
    id: 'shirt-formal',
    title: "Formal Shirt",
    brand: "FORMALIZE",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    reviews: 210,
    tags: ["Formal"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A sophisticated formal shirt for business and special occasions.',
    features: ['Tailored fit', 'Premium fabric', 'Classic design']
  },
  {
    id: 'shirt-cotton',
    title: "Cotton Shirt",
    brand: "COTTON CLUB",
    price: 399,
    originalPrice: 799,
    discount: 50,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.3,
    reviews: 175,
    tags: ["Cotton"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A comfortable cotton shirt for everyday wear.',
    features: ['Breathable fabric', 'Easy care', 'All-day comfort']
  },
  {
    id: 'shirt-casual',
    title: "Casual Shirt",
    brand: "CASUALS",
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.0,
    reviews: 120,
    tags: ["Casual"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A laid-back casual shirt for a relaxed look.',
    features: ['Relaxed fit', 'Soft touch', 'Versatile styling']
  },
  {
    id: 'shirt-linen',
    title: "Linen Shirt",
    brand: "LINEN LIFE",
    price: 599,
    originalPrice: 1199,
    discount: 50,
    image: "https://images.unsplash.com/photo-1593757147298-e064ed1419e5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.4,
    reviews: 98,
    tags: ["Linen"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1593757147298-e064ed1419e5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A premium linen shirt for a sophisticated summer look.',
    features: ['Breathable linen', 'Summer weight', 'Natural texture']
  },
  {
    id: 'shirt-slimfit',
    title: "Slim Fit Shirt",
    brand: "SLIMSTYLE",
    price: 549,
    originalPrice: 1099,
    discount: 50,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviews: 188,
    tags: ["Slim Fit"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A modern slim fit shirt for a sharp silhouette.',
    features: ['Slim fit', 'Stretch fabric', 'Contemporary cut']
  },
  {
    id: 'shirt-polyester',
    title: "Polyester Shirt",
    brand: "POLYPRO",
    price: 350,
    originalPrice: 700,
    discount: 50,
    image: "https://plus.unsplash.com/premium_photo-1674777843130-40233fe45804?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 3.9,
    reviews: 60,
    tags: ["Polyester"],
    gender: "Male",
    category: "Shirts",
    images: ["https://plus.unsplash.com/premium_photo-1674777843130-40233fe45804?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A durable polyester shirt for active lifestyles.',
    features: ['Quick dry', 'Easy care', 'Wrinkle resistant']
  },
  // --- End additional items ---
  {
    id: 'shirt5',
    title: "Relaxed Fit Shirt",
    brand: "FYEROGLER",
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 3.9,
    reviews: 332
  },
  {
    id: 'shirt6',
    title: "Slim Fit Weaved Shirt",
    brand: "NETPLAY",
    price: 449,
    originalPrice: 999,
    discount: 55,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.1,
    reviews: 279
  },
  // Premium shirts
  {
    id: 'premium-shirt1',
    title: "Premium Italian Cotton Dress Shirt",
    brand: "ARMANI",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviews: 89,
    isBestseller: true,
    tags: ["Premium", "Formal", "Italian Cotton"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Luxurious Italian cotton dress shirt with impeccable tailoring.',
    features: ['Italian cotton', 'Mother of pearl buttons', 'Tailored fit']
  },
  {
    id: 'premium-shirt2',
    title: "Designer Silk Blend Shirt",
    brand: "GUCCI",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviews: 45,
    tags: ["Premium", "Designer", "Silk Blend"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Luxurious silk blend shirt with designer details.',
    features: ['Silk blend fabric', 'Designer pattern', 'Modern fit']
  },
  {
    id: 'premium-shirt3',
    title: "Premium Egyptian Cotton Shirt",
    brand: "BROOKS BROTHERS",
    price: 1099,
    originalPrice: 1599,
    discount: 31,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviews: 123,
    isBestseller: true,
    tags: ["Premium", "Formal", "Egyptian Cotton"],
    gender: "Male",
    category: "Shirts",
    images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium Egyptian cotton shirt with exceptional quality.',
    features: ['Egyptian cotton', 'Classic fit', 'Wrinkle-resistant']
  }
];

export const MenShirts: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  // Initialize state with URL params
  const [sortBy, setSortBy] = useState(() => searchParams.get('sortBy') || 'relevance');
  const [priceRange, setPriceRange] = useState(() => ({
    min: parseInt(searchParams.get('minPrice') || '0'),
    max: parseInt(searchParams.get('maxPrice') || '2000')
  }));
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showBestSeller, setShowBestSeller] = useState(() => searchParams.get('bestSeller') === 'true');
  const [selectedGender, setSelectedGender] = useState<string>('Male');
  const [selectedCategory, setSelectedCategory] = useState<string>('Shirts');
  const [filteredProducts, setFilteredProducts] = useState(() => 
    products.filter(p => p.gender === 'Male' && p.category === 'Shirts')
  );

  // Update filtered products when filters change
  useEffect(() => {
    const newFilteredProducts = products
      .filter(product => {
        // Filter by selected gender and category
        if (product.gender !== selectedGender || product.category !== selectedCategory) return false;
        // Price filter
        if (product.price < priceRange.min || product.price > priceRange.max) return false;
        // Best Seller filter
        if (showBestSeller && !product.isBestseller) return false;
        // Tags filter
        if (selectedTags.length > 0 && (!product.tags || !selectedTags.every(tag => product.tags.includes(tag)))) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-low-high':
            return a.price - b.price;
          case 'price-high-low':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });

    setFilteredProducts(newFilteredProducts);
  }, [selectedGender, selectedCategory, priceRange, showBestSeller, selectedTags, sortBy]);

  // Debounced URL update
  useEffect(() => {
    const updateURL = () => {
      const params = new URLSearchParams(searchParams);
      
      if (showBestSeller) {
        params.set('bestSeller', 'true');
      } else {
        params.delete('bestSeller');
      }

      if (sortBy !== 'relevance') {
        params.set('sortBy', sortBy);
      } else {
        params.delete('sortBy');
      }

      if (priceRange.min > 0) {
        params.set('minPrice', priceRange.min.toString());
      } else {
        params.delete('minPrice');
      }

      if (priceRange.max < 2000) {
        params.set('maxPrice', priceRange.max.toString());
      } else {
        params.delete('maxPrice');
      }

      navigate(`/men/shirts?${params.toString()}`, { replace: true });
    };

    const timeoutId = setTimeout(updateURL, 300);
    return () => clearTimeout(timeoutId);
  }, [navigate, searchParams, showBestSeller, sortBy, priceRange]);

  // Filter options for sidebar
  const filterOptions = [
    {
      title: 'Gender',
      options: [
        { label: 'Male' }
      ]
    },
    {
      title: 'Category',
      options: [
        { label: 'Shirts' },
        { label: 'T-Shirts' },
        { label: 'Trousers' },
        { label: 'Jeans' }
      ]
    },
    {
      title: 'Sort By',
      options: [
        { label: 'Relevance', value: 'relevance' },
        { label: 'Price: Low to High', value: 'price-low-high' },
        { label: 'Price: High to Low', value: 'price-high-low' },
        { label: 'Rating', value: 'rating' }
      ]
    },
    {
      title: 'Price Range',
      options: [
        { label: '$0 - $500', min: 0, max: 500 },
        { label: '$500 - $1000', min: 500, max: 1000 },
        { label: '$1000 - $1500', min: 1000, max: 1500 },
        { label: '$1500 - $2000', min: 1500, max: 2000 }
      ]
    }
  ];

  const handleWishlistAction = (product) => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    wishlist.some(p => p.id === product.id) 
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-gray-600 mb-4">
          <span>Home / Men / Shirts</span>
        </nav>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Refine By</h3>
                <span className="text-gray-500">↑</span>
              </div>

              {/* Existing Filters */}
              {filterOptions.map((filter, index) => (
                <div key={index} className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-gray-900">{filter.title}</h4>
                    <span className="text-gray-500">↓</span>
                  </div>
                  <div className="space-y-2">
                    {filter.title === 'Price Range' ? (
                      filter.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center text-sm text-gray-600">
                          <input 
                            type="checkbox" 
                            name="priceRange"
                            value={option.label}
                            checked={priceRange.min === option.min && priceRange.max === option.max}
                            onChange={() => setPriceRange({ min: option.min, max: option.max })}
                            className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                          />
                          {option.label}
                        </label>
                      ))
                    ) : filter.title === 'Category' ? (
                      filter.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center text-sm text-gray-600">
                          <input
                            type="checkbox"
                            name="category"
                            value={option.label}
                            checked={selectedCategory === option.label}
                            onChange={() => {
                              setSelectedCategory(option.label);
                              if (option.label === 'T-Shirts') {
                                navigate('/men/tshirts');
                              } else if (option.label === 'Shirts') {
                                navigate('/men/shirts');
                              } else if (option.label === 'Trousers') {
                                navigate('/men/trousers');
                              } else if (option.label === 'Jeans') {
                                navigate('/men/jeans');
                              }
                            }}
                            className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                          />
                          {option.label}
                        </label>
                      ))
                    ) : filter.title === 'Sort By' ? (
                      filter.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center text-sm text-gray-600">
                          <input 
                            type="checkbox" 
                            name="sortBy"
                            value={option.value}
                            checked={sortBy === option.value}
                            onChange={() => setSortBy(option.value)}
                            className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                          />
                          {option.label}
                        </label>
                      ))
                    ) : (
                      filter.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center text-sm text-gray-600">
                          <input
                            type="checkbox"
                            name="gender"
                            value={option.label}
                            checked={selectedGender === option.label}
                            onChange={() => setSelectedGender(option.label)}
                            className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                          />
                          {option.label}
                        </label>
                      ))
                    )}
                  </div>
                </div>
              ))}

              {/* Best Seller Filter */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Best Seller</h4>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={showBestSeller}
                      onChange={() => setShowBestSeller(!showBestSeller)}
                      className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    Show only Best Sellers
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:w-3/4">
            <div className="mb-6">
              <p className="text-xs text-gray-600 uppercase mb-1">Men's</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shirts</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discover our range of shirts that combine style and comfort for every occasion.
                Whether you prefer crisp formal shirts or relaxed casual styles, choosing the right fit and fabric
                is key to looking your best.
                <button className="text-blue-600 hover:underline ml-1">Read More</button>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-900 font-medium">{filteredProducts.length} Items Found</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">SORT BY</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => navigate(`/menshirt/${product.id}`)}
                    />
                    <button 
                      onClick={() => handleWishlistAction(product)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10"
                    >
                      {wishlist.some(p => p.id === product.id) 
                        ? <FavoriteIcon style={{ color: 'black', fontSize: '20px' }} />
                        : <FavoriteBorderIcon style={{ color: 'black', fontSize: '20px' }} />
                      }
                    </button>
                  </div>
                  <div className="p-4">
                    <h5 className="text-xs font-semibold text-gray-600 uppercase mb-1">{product.brand}</h5>
                    <p
                      className="text-sm text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                      onClick={() => navigate(`/menshirt/${product.id}`)}
                    >
                      {product.title}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-gray-900">₹ {product.price}</span>
                      <span className="text-xs text-gray-500 line-through">₹ {product.originalPrice}</span>
                      <span className="text-xs text-green-600 font-medium">({product.discount}% off)</span>
                    </div>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-amber-500 font-medium">{product.rating}</span>
                        <div className="text-amber-500">★</div>
                        <span className="text-xs text-gray-400">| {product.reviews}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <AuthDialog 
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        type="signin"
        message="Please sign in to add items to your wishlist"
      />
    </div>
  );
};

export default MenShirts;
