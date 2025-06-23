import React, { useState } from 'react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Export the products array (Trousers)
export const products = [
  {
    id: 'trouser1',
    title: "Classic Slim Fit Trousers",
    brand: "URBAN EDGE",
    price: 799,
    originalPrice: 1599,
    discount: 50,
    image: "https://images.pexels.com/photos/1838903/pexels-photo-1838903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.4,
    reviews: 120,
    isBestseller: true,
    tags: ["Slim Fit", "Cotton"],
    gender: "Male",
    category: "Trousers",
    images: ["https://images.pexels.com/photos/1838903/pexels-photo-1838903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    sizes: ['30', '32', '34', '36'],
    description: 'Classic slim fit trousers for a sharp look.',
    features: ['Slim fit', 'Cotton blend', 'Flat front']
  },
  {
    id: 'trouser2',
    title: "Formal Black Trousers",
    brand: "FORMALIZE",
    price: 899,
    originalPrice: 1799,
    discount: 50,
    image: "https://images.pexels.com/photos/30685628/pexels-photo-30685628/free-photo-of-street-style-fashion-with-bold-graphic-prints.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.6,
    reviews: 98,
    tags: ["Formal", "Polyester"],
    gender: "Male",
    category: "Trousers",
    images: ["https://images.pexels.com/photos/30685628/pexels-photo-30685628/free-photo-of-street-style-fashion-with-bold-graphic-prints.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    sizes: ['30', '32', '34', '36'],
    description: 'Elegant black trousers for formal occasions.',
    features: ['Formal', 'Polyester', 'Classic fit']
  },
  {
    id: 'trouser3',
    title: "Casual Chinos",
    brand: "CASUALS",
    price: 699,
    originalPrice: 1399,
    discount: 50,
    image: "https://images.pexels.com/photos/20153995/pexels-photo-20153995/free-photo-of-topless-man-standing-by-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.2,
    reviews: 110,
    tags: ["Chinos", "Casual"],
    gender: "Male",
    category: "Trousers",
    images: ["https://images.pexels.com/photos/20153995/pexels-photo-20153995/free-photo-of-topless-man-standing-by-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    sizes: ['30', '32', '34', '36'],
    description: 'Comfortable chinos for everyday wear.',
    features: ['Chino style', 'Casual', 'Stretch fabric']
  },
  {
    id: 'trouser4',
    title: "Beige Linen Trousers",
    brand: "LINEN LIFE",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    image: "https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.5,
    reviews: 85,
    tags: ["Linen", "Summer"],
    gender: "Male",
    category: "Trousers",
    images: ["https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=800"],
    sizes: ['30', '32', '34', '36'],
    description: 'Lightweight linen trousers for summer.',
    features: ['Linen', 'Beige', 'Breathable']
  },
  {
    id: 'trouser5',
    title: "Navy Blue Joggers",
    brand: "SPORTIFY",
    price: 599,
    originalPrice: 1199,
    discount: 50,
    image: "https://images.pexels.com/photos/6150583/pexels-photo-6150583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.3,
    reviews: 130,
    tags: ["Joggers", "Sports"],
    gender: "Male",
    category: "Trousers",
    images: ["https://images.pexels.com/photos/6150583/pexels-photo-6150583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    sizes: ['30', '32', '34', '36'],
    description: 'Comfortable joggers for active days.',
    features: ['Jogger style', 'Drawstring', 'Stretchable']
  },
];

export const MenTrousers: React.FC = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showBestSeller, setShowBestSeller] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>('Male');
  const [selectedCategory, setSelectedCategory] = useState<string>('Trousers');

  // Unique tags for filter UI
  const allTags = Array.from(new Set(products.flatMap(p => p.tags || [])));

  const sortedProducts = [...products]
    .filter(product => {
      if (product.gender !== selectedGender || product.category !== selectedCategory) return false;
      if (product.price < priceRange.min || product.price > priceRange.max) return false;
      if (showBestSeller && !product.isBestseller) return false;
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
        { label: 'Trousers' },
        { label: 'Shirts' },
        { label: 'T-Shirts' },
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-gray-600 mb-4">
          <span>Home / Men / Trousers</span>
        </nav>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Refine By</h3>
                <span className="text-gray-500">↑</span>
              </div>
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
                              } else if (option.label === 'Jeans') {
                                navigate('/men/jeans');
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trousers</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discover our collection of men's trousers, perfect for formal and casual occasions. Find your fit and style.
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
                        onClick={() => {
                          if (isInWishlist) {
                            removeFromWishlist(product.id);
                          } else {
                            addToWishlist(product);
                          }
                        }}
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
                        onClick={() => navigate(`/mentrouser/${product.id}`)}
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-xs font-semibold text-gray-600 uppercase mb-1">{product.brand}</h5>
                      <p
                        className="text-sm text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={() => navigate(`/mentrouser/${product.id}`)}
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
    </div>
  );
};

export default MenTrousers; 