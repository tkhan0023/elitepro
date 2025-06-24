import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '@/store/AppContext';
import AuthDialog from '@/components/AuthDialog';

// Export the products array for sarees (copying shirts for now)
export const products = [
  {
    id: 'saree1',
    title: "Classic Striped Saree",
    brand: "NETPLAY",
    price: 385,
    originalPrice: 899,
    discount: 57,
    image: "https://cdn.pixabay.com/photo/2024/06/22/16/24/ai-generated-8846622_960_720.jpg",
    rating: 4.2,
    reviews: 156,
    isBestseller: true,
    tags: ["Formal", "Cotton", "Striped", "Party", "Summer", "Traditional", "Casual", "Silk"],
    gender: "Female",
    category: "Sarees",
    images: ["https://cdn.pixabay.com/photo/2024/06/22/16/24/ai-generated-8846622_960_720.jpg"],
    sizes: ['Free'],
    description: 'A classic striped saree for all occasions. Perfect for formal events, casual gatherings, or traditional ceremonies.',
    features: ['Regular fit', 'Breathable cotton', 'Elegant design', 'Versatile styling options']
  },
  {
    id: 'saree2',
    title: "Relaxed Fit Saree",
    brand: "FYEROGLER",
    price: 299,
    originalPrice: 599,
    discount: 50,
    image: "https://cdn.pixabay.com/photo/2023/08/17/02/21/beautiful-8195316_1280.png",
    rating: 3.9,
    reviews: 332,
    tags: ["Casual", "Linen"],
    gender: "Female",
    category: "Sarees",
    images: ["https://cdn.pixabay.com/photo/2023/08/17/02/21/beautiful-8195316_1280.png"],
    sizes: ['Free'],
    description: 'A relaxed fit saree for everyday comfort.',
    features: ['Relaxed fit', 'Soft fabric', 'Versatile style']
  },
  {
    id: 'saree3',
    title: "Slim Fit Weaved Saree",
    brand: "NETPLAY",
    price: 449,
    originalPrice: 999,
    discount: 55,
    image: "https://cdn.pixabay.com/photo/2024/09/30/17/57/indian-9086422_960_720.jpg",
    rating: 4.1,
    reviews: 279,
    isBestseller: true,
    tags: ["Slim Fit", "Cotton"],
    gender: "Female",
    category: "Sarees",
    images: ["https://cdn.pixabay.com/photo/2024/09/30/17/57/indian-9086422_960_720.jpg"],
    sizes: ['Free'],
    description: 'A slim fit saree with a modern weaved pattern.',
    features: ['Slim fit', 'Textured weave', 'Modern look']
  },
  {
    id: 'saree4',
    title: "Classic Striped Saree",
    brand: "NETPLAY",
    price: 385,
    originalPrice: 899,
    discount: 57,
    image: "https://images.pexels.com/photos/2784078/pexels-photo-2784078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 4.2,
    reviews: 156,
    tags: ["Formal", "Polyester"],
    gender: "Female",
    category: "Sarees",
    images: ["https://images.pexels.com/photos/2784078/pexels-photo-2784078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
    sizes: ['Free'],
    description: 'A classic striped saree perfect for formal occasions.',
    features: ['Elegant', 'Polyester', 'Formal style']
  },
  {
    id: 'saree-linen',
    title: "Linen Saree",
    brand: "LINEN LIFE",
    price: 599,
    originalPrice: 1299,
    discount: 54,
    image: "https://images.pexels.com/photos/2723623/pexels-photo-2723623.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.5,
    reviews: 98,
    tags: ["Linen", "Summer"],
    gender: "Female",
    category: "Sarees",
    images: ["https://images.pexels.com/photos/2723623/pexels-photo-2723623.jpeg?auto=compress&cs=tinysrgb&w=600"],
    sizes: ['Free'],
    description: 'A lightweight linen saree for summer.',
    features: ['Linen fabric', 'Lightweight', 'Cool comfort']
  }
];

export const WomenSarees: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const sortByOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price-low-high' },
    { label: 'Price: High to Low', value: 'price-high-low' },
    { label: 'Rating', value: 'rating' }
  ];
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const priceOptions = [
    { label: '₹0 - ₹100', min: 0, max: 100 },
    { label: '₹100 - ₹300', min: 100, max: 300 },
    { label: '₹300 - ₹500', min: 300, max: 500 },
    { label: '₹500 - ₹1000', min: 500, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 }
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showBestSeller, setShowBestSeller] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>('Female');
  const categoryOptions = [
    { label: 'Sarees', value: 'Sarees' },
    { label: 'Kurtis', value: 'Kurtis' },
    { label: 'Dresses', value: 'Dresses' },
    { label: 'Tops', value: 'Tops' }
  ];
  const [selectedCategory, setSelectedCategory] = useState<string>('Sarees');

  // Unique tags for filter UI (copied from MenShirts)
  const allTags = Array.from(new Set(products.flatMap((p) => p.tags)));
  
  // Handle tag parameter from URL
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    if (tagFromUrl && allTags.includes(tagFromUrl)) {
      setSelectedTags([tagFromUrl]);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const inPriceRange = product.price >= priceRange.min && product.price <= priceRange.max;
    const hasTag = selectedTags.length === 0 || selectedTags.some((tag) => product.tags.includes(tag));
    const isBestSeller = !showBestSeller || product.isBestseller;
    const inCategory = selectedCategory === product.category;
    const isFemale = product.gender === 'Female';
    return inPriceRange && hasTag && isBestSeller && inCategory && isFemale;
  });

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
          <span>Home / Women / Sarees</span>
        </nav>

        {/* Filters and product grid (copied from MenShirts) */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Refine By</h3>
                <span className="text-gray-500">↑</span>
              </div>
              {/* Gender */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Gender</h4>
                  <span className="text-gray-500">↓</span>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name="gender"
                      checked={true}
                      readOnly
                      className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    Female
                  </label>
                </div>
              </div>
              {/* Category */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Category</h4>
                  <span className="text-gray-500">↓</span>
                </div>
                <div className="space-y-2">
                  {categoryOptions.map((cat) => (
                    <label key={cat.value} className="flex items-center text-sm text-gray-600">
                      <input
                        type="checkbox"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={() => {
                          setSelectedCategory(cat.value);
                          if (cat.value === 'Sarees') {
                            navigate('/women/sarees');
                          } else if (cat.value === 'Kurtis') {
                            navigate('/women/kurtis');
                          } else if (cat.value === 'Dresses') {
                            navigate('/women/dresses');
                          } else if (cat.value === 'Tops') {
                            navigate('/women/tops');
                          }
                        }}
                        className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      {cat.label}
                    </label>
                  ))}
                </div>
              </div>
              {/* Sort By */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Sort By</h4>
                  <span className="text-gray-500">↓</span>
                </div>
                <div className="space-y-2">
                  {sortByOptions.map((option) => (
                    <label key={option.value} className="flex items-center text-sm text-gray-600">
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
                  ))}
                </div>
              </div>
              {/* Price Range */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Price Range</h4>
                  <span className="text-gray-500">↓</span>
                </div>
                <div className="space-y-2">
                  {priceOptions.map((option) => (
                    <label key={option.label} className="flex items-center text-sm text-gray-600">
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
                  ))}
                </div>
              </div>
              {/* Best Seller */}
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
              {/* Tags */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Tags</h4>
                  {selectedTags.length > 0 && (
                    <button 
                      onClick={() => setSelectedTags([])}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => {
                          // Update URL when tag is selected/deselected
                          const newTags = selectedTags.includes(tag)
                            ? selectedTags.filter(t => t !== tag)
                            : [...selectedTags, tag];
                          
                          setSelectedTags(newTags);
                          
                          // Update URL with selected tag or remove tag parameter
                          if (newTags.length === 1) {
                            navigate(`/women/sarees?tag=${encodeURIComponent(newTags[0])}`, { replace: true });
                          } else if (newTags.length === 0) {
                            navigate('/women/sarees', { replace: true });
                          }
                        }}
                        className="mr-2 border border-gray-300 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className={selectedTags.includes(tag) ? "font-medium text-blue-600" : ""}>
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          {/* Product Grid */}
          <section className="w-full md:w-3/4">
            <p className="text-xs text-gray-600 uppercase mb-1">Women's</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Sarees</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Discover our range of sarees that blend tradition and elegance for every occasion. Whether you love classic drapes or modern styles, choosing the right fabric, color, and design is key to expressing your unique style.
              <button className="text-blue-600 hover:underline ml-1">Read More</button>
            </p>
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
            {(() => {
              let sortedProducts = [...filteredProducts];
              if (sortBy === 'price-low-high') {
                sortedProducts.sort((a, b) => a.price - b.price);
              } else if (sortBy === 'price-high-low') {
                sortedProducts.sort((a, b) => b.price - a.price);
              } else if (sortBy === 'rating') {
                sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
              }
              return (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => {
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
                              onClick={() => navigate(`/womensaree/${product.id}`)}
                            />
                          </div>
                          <div className="p-4">
                            <h5 className="text-xs font-semibold text-gray-600 uppercase mb-1">{product.brand}</h5>
                            <p
                              className="text-sm text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                              onClick={() => navigate(`/womensaree/${product.id}`)}
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
                      );
                    })}
                  </div>
                  {sortedProducts.length === 0 && (
                    <div className="text-center text-gray-500 mt-12">No sarees found for the selected filters.</div>
                  )}
                </>
              );
            })()}
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

export default WomenSarees;
