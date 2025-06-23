
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';

interface Product {
  id: string | number;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount?: number;
  image: string;
  rating?: number;
  reviews?: number;
  isBestseller?: boolean;
}

interface ProductCardProps {
  product: Product;
  showHeart?: boolean;
}

const ProductCard = ({ product, showHeart = true }: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const inWishlist = wishlist.some((p) => p.id === product.id);
  const toggleWishlist = () => {
    inWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {product.isBestseller && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold z-10">
            BESTSELLER
          </span>
        )}
        
        {showHeart && (
          <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10" onClick={toggleWishlist}>
          <Heart className={`w-4 h-4 ${inWishlist ? 'text-black' : 'text-gray-600'}`} fill={inWishlist ? 'currentColor' : 'none'} />
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
        <h5 className="text-xs font-semibold text-gray-600 uppercase mb-1">{product.brand}</h5>
        <Link to={`/product/${product.id}`}>
          <p className="text-sm text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.title}
          </p>
        </Link>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
          <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
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
};

export default ProductCard;
