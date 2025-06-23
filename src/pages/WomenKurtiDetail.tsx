import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { products } from './WomenKurtis';

const WomenKurtiDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const inWishlist = !!product && wishlist.some((p) => p.id === product.id);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || '');

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-gray-600 mb-6">
          <span>Home / Women / Kurtis / </span>
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
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === image ? 'border-gray-900' : 'border-gray-200'}`}
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
                      className={`w-12 h-12 border rounded-lg font-medium ${selectedSize === size ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
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
                  onClick={() => addToCart(product, selectedSize, quantity)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                >
                  <Heart className={`w-6 h-6 ${inWishlist ? 'text-black' : 'text-gray-600'}`} fill={inWishlist ? 'currentColor' : 'none'} />
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
    </div>
  );
};

export default WomenKurtiDetail;
