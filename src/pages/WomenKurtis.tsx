import React, { useState } from 'react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '@/store/AppContext';
import AuthDialog from '@/components/AuthDialog';

// Export the products array for kurtis
export const products = [
  {
    id: 'kurti1',
    title: "Elegant Printed Kurti",
    brand: "AURELIA",
    price: 499,
    originalPrice: 999,
    discount: 50,
    image: "https://as1.ftcdn.net/v2/jpg/15/03/01/82/1000_F_1503018267_4TQPChan6L2Gl2IBBXehbTG2mRqIGzgP.jpg",
    rating: 4.5,
    reviews: 120,
    isBestseller: true,
    tags: ["Casual", "Cotton"],
    gender: "Female",
    category: "Kurtis",
    images: ["https://as1.ftcdn.net/v2/jpg/15/03/01/82/1000_F_1503018267_4TQPChan6L2Gl2IBBXehbTG2mRqIGzgP.jpg"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A beautiful printed kurti for daily wear.',
    features: ['Comfort fit', 'Soft cotton', 'Trendy print']
  },
  {
    id: 'kurti2',
    title: "Festive Embroidered Kurti",
    brand: "BIBA",
    price: 799,
    originalPrice: 1599,
    discount: 50,
    image: "https://as2.ftcdn.net/v2/jpg/07/90/04/25/1000_F_790042518_EGl1AXqD6xJzOmuC17KPKDCRjPKGtHIN.jpg",
    rating: 4.3,
    reviews: 85,
    tags: ["Festive", "Embroidered"],
    gender: "Female",
    category: "Kurtis",
    images: ["https://as2.ftcdn.net/v2/jpg/07/90/04/25/1000_F_790042518_EGl1AXqD6xJzOmuC17KPKDCRjPKGtHIN.jpg"],
    sizes: ['M', 'L', 'XL'],
    description: 'Perfect for festive occasions with elegant embroidery.',
    features: ['Embroidered', 'Festive look', 'Comfortable fit']
  },
  {
    id: 'kurti3',
    title: "Office Wear Kurti",
    brand: "W",
    price: 599,
    originalPrice: 1199,
    discount: 50,
    image: "https://cdn.pixabay.com/photo/2024/09/30/17/57/indian-9086422_960_720.jpg",
    rating: 4.0,
    reviews: 60,
    isBestseller: false,
    tags: ["Office", "Cotton"],
    gender: "Female",
    category: "Kurtis",
    images: ["https://cdn.pixabay.com/photo/2024/09/30/17/57/indian-9086422_960_720.jpg"],
    sizes: ['S', 'M', 'L'],
    description: 'Smart office wear kurti in cotton fabric.',
    features: ['Office fit', 'Breathable', 'Smart design']
  },
  {
    id: 'kurti4',
    title: "Floral Anarkali Kurti",
    brand: "GLOBAL DESI",
    price: 899,
    originalPrice: 1799,
    discount: 50,
    image: "https://as1.ftcdn.net/v2/jpg/11/03/15/32/1000_F_1103153280_E42pFkozuhaplEL5LSSfC5j7OTpNurtc.jpg",
    rating: 4.7,
    reviews: 142,
    isBestseller: true,
    tags: ["Anarkali", "Floral", "Festive"],
    gender: "Female",
    category: "Kurtis",
    images: ["https://as1.ftcdn.net/v2/jpg/11/03/15/32/1000_F_1103153280_E42pFkozuhaplEL5LSSfC5j7OTpNurtc.jpg"],
    sizes: ['M', 'L', 'XL'],
    description: 'A flowy floral anarkali kurti perfect for festive occasions.',
    features: ['Anarkali style', 'Floral print', 'Festive wear']
  },
  {
    id: 'kurti5',
    title: "Straight Rayon Kurti",
    brand: "VISHUDH",
    price: 399,
    originalPrice: 899,
    discount: 56,
    image: "https://as2.ftcdn.net/v2/jpg/08/87/95/95/1000_F_887959542_HbafHHbnMJWtpjZlbpOiJQoR8Ewlvoqt.jpg",
    rating: 4.2,
    reviews: 98,
    isBestseller: false,
    tags: ["Straight", "Rayon", "Casual"],
    gender: "Female",
    category: "Kurtis",
    images: ["https://as2.ftcdn.net/v2/jpg/08/87/95/95/1000_F_887959542_HbafHHbnMJWtpjZlbpOiJQoR8Ewlvoqt.jpg"],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A comfortable straight cut rayon kurti for everyday use.',
    features: ['Straight fit', 'Rayon fabric', 'Easy to wear']
  },
  {
    id: 'kurti6',
    title: "Designer Party Kurti",
    brand: "FABINDIA",
    price: 1299,
    originalPrice: 2599,
    discount: 50,
    image: "https://as1.ftcdn.net/v2/jpg/08/52/47/78/1000_F_852477875_SCFbPQ3EHCdzcs5EzjZv6OZQjA1NZRdv.jpg",
    rating: 4.8,
    reviews: 210,
    isBestseller: true,
    tags: ["Party", "Designer", "Premium"],
    gender: "Female",
    category: "Kurtis",
    images: [
      "https://as1.ftcdn.net/v2/jpg/08/52/47/78/1000_F_852477875_SCFbPQ3EHCdzcs5EzjZv6OZQjA1NZRdv.jpg",
      "https://as1.ftcdn.net/v2/jpg/08/52/47/78/1000_F_852477875_SCFbPQ3EHCdzcs5EzjZv6OZQjA1NZRdv.jpg",
      "https://as1.ftcdn.net/v2/jpg/08/52/47/78/1000_F_852477875_SCFbPQ3EHCdzcs5EzjZv6OZQjA1NZRdv.jpg"
    ],
    sizes: ['M', 'L'],
    description: 'A premium designer kurti for special occasions and parties.',
    features: ['Designer look', 'Premium fabric', 'Party wear']
  }
];

export const WomenKurtis: React.FC = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showBestSeller, setShowBestSeller] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>('Female');
  const [selectedCategory, setSelectedCategory] = useState<string>('Kurtis');

  const allTags = Array.from(new Set(products.flatMap((p) => p.tags)));

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
          <span>Home / Women / Kurtis</span>
        </nav>
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
          {/* Product Grid */}
          <section className="w-full md:w-3/4">
            <p className="text-xs text-gray-600 uppercase mb-1">Women's</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Kurtis</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Discover our latest collection of kurtis that blend comfort and style for every occasion.
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
            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
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
                        onClick={() => navigate(`/womenkurti/${product.id}`)}
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-xs font-semibold text-gray-600 uppercase mb-1">{product.brand}</h5>
                      <p
                        className="text-sm text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={() => navigate(`/womenkurti/${product.id}`)}
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
            {filteredProducts.length === 0 && (
              <div className="text-center text-gray-500 mt-12">No kurtis found for the selected filters.</div>
            )}
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

export default WomenKurtis;
