import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart } from 'lucide-react';
import { useWishlist, Product as WishlistProduct } from '@/context/WishlistContext';
import { Product as GlobalProduct } from '@/types';
import { Product as CartProduct } from '@/context/CartContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Search, TrendingUp, Tag, Percent } from 'lucide-react';
import { useAuth } from '@/store/AppContext';
import AuthDialog from '@/components/AuthDialog';

export type ProductWithAll = GlobalProduct & WishlistProduct & CartProduct;

export const products: ProductWithAll[] = [
  {
    id: 'top1',
    name: 'Floral Print Peplum Top',
    title: 'Floral Print Peplum Top',
    brand: 'Zara',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1631234764568-996fab371596?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1631234764568-996fab371596?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631234763159-fd6ff321e1c7?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631234764099-83bf706f5905?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631234764784-db9c219998c9?q=80&w=1974&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Tops',
    tags: ['Floral', 'Peplum', 'Casual', 'Summer'],
    rating: 4.5,
    reviews: 128,
    inStock: true,
    description: 'Beautiful floral print peplum top with ruffle details. Perfect for summer casual wear.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isBestseller: true,
    gender: 'Female'
  },
  {
    id: 'top2',
    name: 'Silk Evening Top',
    title: 'Silk Evening Top',
    brand: 'H&M',
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1587070297440-7b8a62eb01c4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1587070297440-7b8a62eb01c4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1587070297440-7b8a62eb01c4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1587070297440-7b8a62eb01c4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1587070297440-7b8a62eb01c4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tops',
    tags: ['Silk', 'Evening', 'Party', 'Luxury'],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    description: 'Elegant silk evening top with a subtle sheen. Perfect for special occasions.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isBestseller: true,
    gender: 'Female'
  },
  {
    id: 'top3',
    name: 'Striped Wrap Top',
    title: 'Striped Wrap Top',
    brand: 'Mango',
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598554747412-0b70f87582e9?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598554747378-3b6c9d3a1c0d?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598554747496-75ab4c5336d5?q=80&w=1974&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Tops',
    tags: ['Striped', 'Wrap', 'Work', 'Casual'],
    rating: 4.3,
    reviews: 156,
    inStock: true,
    description: 'Classic striped wrap top with adjustable tie. Perfect for both work and casual settings.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isBestseller: true,
    gender: 'Female'
  },
  {
    id: 'top4',
    name: 'Ruffled Sleeve Blouse',
    title: 'Ruffled Sleeve Blouse',
    brand: 'Forever 21',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1620058018217-cfe351d4059b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    images: [
      'https://images.unsplash.com/photo-1620058018217-cfe351d4059b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1620058018217-cfe351d4059b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1620058018217-cfe351d4059b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1620058018217-cfe351d4059b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tops',
    tags: ['Ruffle', 'Romantic', 'Casual', 'Spring'],
    rating: 4.4,
    reviews: 112,
    inStock: true,
    description: 'Feminine blouse with ruffle sleeve details. Perfect for a romantic spring look.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isBestseller: true,
    gender: 'Female'
  },
  {
    id: 'top5',
    name: 'Off-Shoulder Top',
    title: 'Off-Shoulder Top',
    brand: 'Zara',
    price: 1699,
    originalPrice: 2499,
    discount: 32,
    image: 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609505848948-b7c3b8b4beda?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609505848978-b7c3b8b4beda?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609505848998-b7c3b8b4beda?q=80&w=1974&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Tops',
    tags: ['Off-shoulder', 'Summer', 'Casual', 'Beach'],
    rating: 4.6,
    reviews: 95,
    inStock: true,
    description: 'Trendy off-shoulder top with elastic neckline. Perfect for summer outings.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isBestseller: true,
    gender: 'Female'
  },
  {
    id: 'top6',
    name: 'Lace Detail Blouse',
    title: 'Lace Detail Blouse',
    brand: 'H&M',
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    image: 'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624206112948-f140f087f9b5?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624206112978-f140f087f9b5?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624206112998-f140f087f9b5?q=80&w=1974&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tops',
    tags: ['Lace', 'Elegant', 'Work', 'Evening'],
    rating: 4.5,
    reviews: 78,
    inStock: true,
    description: 'Elegant blouse with delicate lace details. Versatile for both work and evening wear.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isBestseller: true,
    gender: 'Female'
  }
];

const WomenTops = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
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
  const [selectedGender, setSelectedGender] = useState<string>('Female');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tops');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Get all unique tags
  const allTags = Array.from(new Set(products.flatMap(product => product.tags || [])));

  // Update filtered products when filters change
  useEffect(() => {
    const newFilteredProducts = products
      .filter(product => {
        // Price filter
        if (product.price < priceRange.min || product.price > priceRange.max) return false;
        // Tags filter
        if (selectedTags.length > 0 && (!product.tags || !selectedTags.some(tag => product.tags?.includes(tag)))) return false;
        // Best Seller filter - assuming products with rating > 4.5 are bestsellers
        if (showBestSeller && product.rating < 4.5) return false;
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
  }, [priceRange, showBestSeller, selectedTags, sortBy]);

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

      navigate(`/women/tops?${params.toString()}`, { replace: true });
    };

    const timeoutId = setTimeout(updateURL, 300);
    return () => clearTimeout(timeoutId);
  }, [navigate, searchParams, showBestSeller, sortBy, priceRange]);

  // Filter options for sidebar
  const filterOptions = [
    {
      title: 'Gender',
      options: [
        { label: 'Female' }
      ]
    },
    {
      title: 'Category',
      options: [
        { label: 'Tops' },
        { label: 'Dresses' },
        { label: 'Sarees' },
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
          <span>Home / Women / Tops</span>
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
                              if (option.label === 'Tops') {
                                navigate('/women/tops');
                              } else if (option.label === 'Dresses') {
                                navigate('/women/dresses');
                              } else if (option.label === 'Sarees') {
                                navigate('/women/sarees');
                              } else if (option.label === 'Jeans') {
                                navigate('/women/jeans');
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

              {/* Tags Filter */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Tags</h4>
                  <span className="text-gray-500">↓</span>
                </div>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                        className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>

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
              <p className="text-xs text-gray-600 uppercase mb-1">Women's</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tops</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discover our range of tops that combine style and comfort for every occasion.
                Whether you prefer elegant evening tops or casual everyday styles, choosing the right fit and fabric
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
              {filteredProducts.map(product => {
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
                        alt={product.title || product.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => navigate(`/womentop/${product.id}`)}
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-xs font-semibold text-gray-600 uppercase mb-1">{product.brand}</h5>
                      <p
                        className="text-sm text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={() => navigate(`/womentop/${product.id}`)}
                      >
                        {product.title || product.name}
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
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <AuthDialog 
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        type="signin"
        message="Please sign in to add items to your wishlist"
      />
    </div>
  );
};

export default WomenTops; 