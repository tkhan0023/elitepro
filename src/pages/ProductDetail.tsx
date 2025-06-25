import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/store/AppContext';
import AuthDialog from '@/components/AuthDialog';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  // Hardcoded product data
  const products = [
    {
      id: '1',
      title: "Men OG Striped Regular Fit Shirt with Patch Pocket",
      brand: "NETPLAY",
      price: 385,
      originalPrice: 899,
      discount: 57,
      rating: 4.2,
      reviews: 156,
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: "This premium striped shirt combines classic style with modern comfort.",
      features: [
        'Regular fit with a relaxed silhouette',
        'Soft and breathable fabric for all-day comfort',
        'Patch pocket on the chest for added functionality'
      ]
    },
    {
      id: '2',
      title: "Women Casual Relaxed Fit Shirt",
      brand: "FYEROGLER",
      price: 299,
      originalPrice: 599,
      discount: 50,
      rating: 4.5,
      reviews: 200,
      images: [
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      description: "A relaxed fit shirt perfect for casual outings.",
      features: [
        'Relaxed fit with a comfortable silhouette',
        'Soft and breathable fabric for all-day comfort',
        'V-neckline with a button placket'
      ]
    },
    {
      id: '3',
      title: "Men Self-Weaved Slim Fit Shirt",
      brand: "NETPLAY",
      price: 449,
      originalPrice: 999,
      discount: 55,
      rating: 4.1,
      reviews: 279,
      images: [
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      description: "A slim fit shirt with a self-weaved pattern.",
      features: [
        'Slim fit with a modern silhouette',
        'Soft and breathable fabric for all-day comfort',
        'Self-weaved pattern for added texture'
      ]
    },
    {
      id: '4',
      title: "Premium Cotton Blend T-Shirt",
      brand: "BASICS",
      price: 199,
      originalPrice: 399,
      discount: 50,
      rating: 4.5,
      reviews: 523,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      description: "A premium cotton blend t-shirt for everyday wear.",
      features: [
        'Regular fit with a comfortable silhouette',
        'Soft and breathable fabric for all-day comfort',
        'Cotton blend for added durability'
      ]
    }
  ];

  // Find the product by ID
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    if (product) {
      addToCart(product, selectedSize, quantity);
    }
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    if (product) {
      const inWishlist = wishlist.some((item) => item.id === id);
      if (inWishlist) {
        removeFromWishlist(id);
      } else {
        addToWishlist(product);
      }
    }
  };

  const inWishlist = wishlist.some((item) => item.id === id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-gray-600 mb-6">
          <span>Home / Men / Western Wear / Shirts / </span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </nav>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={selectedImage || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === image ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h5 className="text-sm font-semibold text-gray-600 uppercase">{product.brand}</h5>
                <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.title}</h1>
                
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-amber-500 font-medium">{product.rating}</span>
                  <div className="text-amber-500">★★★★☆</div>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="text-lg text-green-600 font-medium">({product.discount}% off)</span>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border rounded-lg font-medium ${
                        selectedSize === size 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    onClick={handleAddToCart}
                  >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                
                <button
                  onClick={handleWishlist}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart
                    className={inWishlist ? 'text-red-500' : 'text-gray-600'}
                    fill={inWishlist ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Product Details</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      <AuthDialog 
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        type="signin"
      />
    </div>
  );
};

export default ProductDetail;
