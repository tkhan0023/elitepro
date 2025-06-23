import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import { products as menShirts } from './MenShirts';
import { products as menTShirts } from './MenTShirts';
import { products as menJeans } from './MenJeans';
import { products as menTrousers } from './MenTrousers';
import { products as womenTops } from './WomenTops';
import { products as womenDresses } from './WomenDresses';
import { products as womenSarees } from './WomenSarees';
import { products as womenKurtis } from './WomenKurtis';

type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images: string[];
  sizes: string[];
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  description: string;
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  // Combine all products
  const allProducts = [
    ...menShirts,
    ...menTShirts,
    ...menJeans,
    ...menTrousers,
    ...womenTops,
    ...womenDresses,
    ...womenSarees,
    ...womenKurtis
  ];

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get all unique tags and categories
  const allTags = Array.from(new Set(allProducts.flatMap(product => product.tags || [])));
  const allCategories = Array.from(new Set(allProducts.map(product => product.category)));

  useEffect(() => {
    // Filter products based on search query and other filters
    let results = allProducts.filter(product => {
      const matchesSearch = 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        (product.tags || []).some(tag => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      const matchesTags = selectedTags.length === 0 || 
        (product.tags && selectedTags.some(tag => product.tags.includes(tag)));
      
      const matchesCategories = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);

      return matchesSearch && matchesPrice && matchesTags && matchesCategories;
    });

    // Sort products
    results = results.sort((a, b) => {
      switch (sortBy) {
        case 'price-low-to-high':
          return a.price - b.price;
        case 'price-high-to-low':
          return b.price - a.price;
        case 'discount':
          return b.discount - a.discount;
        case 'rating':
          return b.rating - a.rating;
        default: // 'newest'
          return b.reviews - a.reviews; // Use reviews as a proxy for popularity/newness
      }
    });

    setFilteredProducts(results as Product[]);
  }, [query, priceRange, selectedTags, sortBy, selectedCategories]);

  const getProductLink = (product: Product) => {
    const id = product.id;
    switch (product.category) {
      case 'Shirts':
        return `/menshirt/${id}`;
      case 'T-Shirts':
        return `/mentshirt/${id}`;
      case 'Tops':
        return `/womentop/${id}`;
      case 'Dresses':
        return `/womendress/${id}`;
      case 'Sarees':
        return `/womensaree/${id}`;
      case 'Kurtis':
        return `/womenkurti/${id}`;
      default:
        return `/product/${id}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Search Results for "{query}"
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Refine by</h2>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                <div className="space-y-2">
                  {allCategories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => {
                          if (selectedCategories.includes(category)) {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          } else {
                            setSelectedCategories([...selectedCategories, category]);
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center">
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
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort Options */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{filteredProducts.length} products</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative">
                    <Link to={getProductLink(product)}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-64 object-cover"
                      />
                    </Link>
                    <button
                      onClick={() => {
                        if (wishlist.some(p => p.id === product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist(product);
                        }
                      }}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <Heart
                        className={wishlist.some(p => p.id === product.id) ? 'fill-black' : ''}
                        size={20}
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <Link to={getProductLink(product)}>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{product.title}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                      {product.discount && (
                        <span className="text-sm text-green-600 font-medium">({product.discount}% OFF)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-sm font-medium text-amber-500">{product.rating}</span>
                      <span className="text-amber-500">★</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
