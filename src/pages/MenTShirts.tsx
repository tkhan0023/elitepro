import React, { useState } from 'react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '@/store/AppContext';
import AuthDialog from '@/components/AuthDialog';

// Export the products array (T-Shirts)
export const products = [
  {
    id: 'tshirt1',
    title: "Classic White Crew Neck T-Shirt",
    brand: "URBAN EDGE",
    price: 299,
    originalPrice: 699,
    discount: 57,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    rating: 4.3,
    reviews: 210,
    isBestseller: true,
    tags: ["Casual", "Cotton"],
    gender: "Male",
    category: "T-Shirts",
    images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A classic white crew neck t-shirt for everyday comfort.',
    features: ['Regular fit', 'Soft cotton', 'Crew neck']
  },
  {
    id: 'tshirt2',
    title: "Black Graphic Print T-Shirt",
    brand: "STYLE HUB",
    price: 349,
    originalPrice: 799,
    discount: 56,
    image: "https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    reviews: 180,
    tags: ["Graphic", "Trendy"],
    gender: "Male",
    category: "T-Shirts",
    images: ["https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A trendy black t-shirt with a bold graphic print.',
    features: ['Regular fit', 'Graphic print', 'Short sleeves']
  },
  {
    id: 'tshirt3',
    title: "Black V-Neck Essential T-Shirt",
    brand: "BASIC MAN",
    price: 259,
    originalPrice: 599,
    discount: 57,
    image: "https://images.pexels.com/photos/1983925/pexels-photo-1983925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.1,
    reviews: 140,
    isBestseller: true,
    tags: ["V-Neck", "Cotton"],
    gender: "Male",
    category: "T-Shirts",
    images: ["https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=800&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A must-have blue v-neck t-shirt for a modern look.',
    features: ['V-neck', 'Soft cotton', 'Modern fit']
  },
  {
    id: 'tshirt4',
    title: "Athletic Fit Sports T-Shirt",
    brand: "SPORTIFY",
    price: 399,
    originalPrice: 899,
    discount: 56,
    image: "https://images.pexels.com/photos/1983925/pexels-photo-1983925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.5,
    reviews: 220,
    tags: ["Sports", "Polyester"],
    gender: "Male",
    category: "T-Shirts",
    images: ["https://images.pexels.com/photos/1983925/pexels-photo-1983925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A performance t-shirt for athletic activities.',
    features: ['Athletic fit', 'Moisture-wicking', 'Lightweight']
  },
  {
    id: 'tshirt5',
    title: "Henley Neck T-Shirt",
    brand: "URBAN EDGE",
    price: 329,
    originalPrice: 749,
    discount: 56,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    rating: 4.2,
    reviews: 160,
    tags: ["Henley", "Cotton"],
    gender: "Male",
    category: "T-Shirts",
    images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A stylish henley neck t-shirt for casual wear.',
    features: ['Henley neck', 'Button placket', 'Soft fabric']
  },
  {
    id: 'tshirt6',
    title: "Long Sleeve Olive T-Shirt",
    brand: "BASIC MAN",
    price: 379,
    originalPrice: 899,
    discount: 58,
    image: "https://images.pexels.com/photos/32514682/pexels-photo-32514682/free-photo-of-casual-photographer-relaxing-indoors-with-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.0,
    reviews: 110,
    tags: ["Long Sleeve", "Cotton"],
    gender: "Male",
    category: "T-Shirts",
    images: ["https://images.pexels.com/photos/32514682/pexels-photo-32514682/free-photo-of-casual-photographer-relaxing-indoors-with-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A versatile long sleeve olive t-shirt for all seasons.',
    features: ['Long sleeves', 'Soft cotton', 'Versatile style']
  },
];

export const MenTShirts: React.FC = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showBestSeller, setShowBestSeller] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>('Male');
  const [selectedCategory, setSelectedCategory] = useState<string>('T-Shirts');

  // Unique tags for filter UI
  const allTags = Array.from(new Set(products.flatMap(p => p.tags || [])));

  const sortedProducts = [...products]
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
        // 'relevance' just returns all items as is (no sort)
        default:
          return 0;
      }
    });

  // Filter options for sidebar (except tags/best seller, which are custom below)
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
        { label: 'T-Shirts' },
        { label: 'Shirts' },
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
        { label: '$0 - $100', min: 0, max: 100 },
        { label: '$100 - $300', min: 100, max: 300 },
        { label: '$300 - $500', min: 300, max: 500 },
        { label: '$500 - $1000', min: 500, max: 1000 }
      ]
    }
  ];

  const handleWishlistAction = (product) => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    if (wishlist.some((p) => p.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-gray-600 mb-4">
          <span>Home / Men / T-Shirts</span>
        </nav>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Refine By</h3>
                <span className="text-gray-500">↑</span>
              </div>

              {/* Existing Filters (Gender, Category, Sort By, Price Range) */}
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
                    ) : filter.title === 'Gender' ? (
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
                              if (option.label === 'Shirts') {
                                navigate('/men/shirts');
                              } else if (option.label === 'T-Shirts') {
                                navigate('/men/tshirts');
                              } else if (option.label === 'Trousers') {
                                navigate('/men/trousers');
                              }
                            }}
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
                            name="sortBy"
                            value={option.value}
                            checked={sortBy === option.value}
                            onChange={() => setSortBy(option.value)}
                            className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                          />
                          {option.label}
                        </label>
                      ))
                    )}
                  </div>
                </div>
              ))}

              {/* Best Seller Filter (moved below Price Range) */}
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

              {/* Tags Filter (moved below Best Seller) */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Tags</h4>
                </div>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => {
                          setSelectedTags(selectedTags.includes(tag)
                            ? selectedTags.filter(t => t !== tag)
                            : [...selectedTags, tag]);
                        }}
                        className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          <section className="lg:w-3/4">
            <div className="mb-6">
              <p className="text-xs text-gray-600 uppercase mb-1">Men's</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">T-Shirts</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Explore our collection of men's t-shirts, perfect for every style and occasion. From classic basics to trendy prints, find your new favorite tee here.
                <button className="text-blue-600 hover:underline ml-1">Read More</button>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-900 font-medium">{sortedProducts.length} Items Found</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sortedProducts.map(product => {
                const isInWishlist = wishlist.some((p) => p.id === product.id);
                return (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      {product.isBestseller && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold z-10">
                          BESTSELLER
                        </span>
                      )}
                      <button
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10"
                        onClick={() => handleWishlistAction(product)}
                        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        {isInWishlist ? (
                          <FavoriteIcon style={{ color: 'black', fontSize: '20px' }} />
                        ) : (
                          <FavoriteBorderIcon style={{ color: 'black', fontSize: '20px' }} />
                        )}
                      </button>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => navigate(`/mentshirt/${product.id}`)}
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-xs font-semibold text-gray-600 uppercase mb-1">{product.brand}</h5>
                      <p
                        className="text-sm text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={() => navigate(`/mentshirt/${product.id}`)}
                      >
                        {product.title}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-gray-900">$ {product.price}</span>
                        <span className="text-xs text-gray-500 line-through">$ {product.originalPrice}</span>
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
                );
              })}
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

export default MenTShirts; 