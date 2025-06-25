import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types";
import { useAuth } from "@/store/AppContext";
import { useState } from "react";
import AuthDialog from "./AuthDialog";

interface ProductCardProps {
  product: Product;
  showHeart?: boolean;
}

const ProductCard = ({ product, showHeart = true }: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const inWishlist = wishlist.some((p) => p.id === product.id);
  
  const toggleWishlist = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    inWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
  };
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          {product.isBestseller && (
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold z-10">
              BESTSELLER
            </span>
          )}
          
          {showHeart && (
            <button 
              className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10" 
              onClick={toggleWishlist}
            >
              <Heart 
                className={`w-4 h-4 ${inWishlist ? 'text-black' : 'text-gray-600'}`} 
                fill={inWishlist ? 'currentColor' : 'none'} 
              />
            </button>
          )}
          
          <Link to={`/product/${product.id}`}>
            <img 
              src={product.image}
              alt={product.title}
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
        
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xs text-gray-500 line-through ml-2">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs text-green-600 ml-2">
                    ({product.discount}% OFF)
                  </span>
                </>
              )}
            </div>
            {product.rating && (
              <div className="flex items-center">
                <span className="text-xs font-medium text-gray-900">{product.rating}</span>
                <span className="text-xs text-gray-500 ml-1">★</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthDialog 
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        type="signin"
        message="Please sign in to add items to your wishlist"
      />
    </>
  );
};

export default ProductCard;
