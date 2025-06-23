import { Search, Heart, ShoppingBag, Menu, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/store/AppContext';
import AuthDialog from './AuthDialog';
import { useNavigate } from 'react-router-dom';
import SearchSuggestions from './SearchSuggestions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAuthenticated, signOut } = useAuth();
  const [shake, setShake] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWomenDropdownOpen, setIsWomenDropdownOpen] = useState(false);
  const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);
  const [isKidsDropdownOpen, setIsKidsDropdownOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogType, setAuthDialogType] = useState<'signin' | 'join'>('signin');

  let menDropdownTimeout;
  let womenDropdownTimeout;
  let kidsDropdownTimeout;
  let homeDropdownTimeout;

  const handleAuthClick = (type: 'signin' | 'join') => {
    setAuthDialogType(type);
    setAuthDialogOpen(true);
  };

  // Helper to close all dropdowns
  const closeAllDropdowns = () => {
    setIsMenDropdownOpen(false);
    setIsWomenDropdownOpen(false);
    setIsKidsDropdownOpen(false);
    setIsHomeDropdownOpen(false);
  };

  useEffect(() => {
    if (wishlist.length > 0) {
      setShake(true);
      const t = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(t);
    }
  }, [wishlist.length]);
  
  // Cart animation effect that triggers every 5 seconds when cart has items
  useEffect(() => {
    let animationInterval: NodeJS.Timeout;
    
    if (cart.length > 0) {
      // Initial animation
      setCartAnimation(true);
      
      // Set up interval for repeated animations - show for 3 seconds, hide for 7 seconds
      animationInterval = setInterval(() => {
        setCartAnimation(true);
        setTimeout(() => setCartAnimation(false), 3000);
      }, 10000); // More subtle frequency - every 10 seconds
      
      // Auto-hide initial animation after 3 seconds
      const initialTimeout = setTimeout(() => setCartAnimation(false), 3000);
      
      return () => {
        clearTimeout(initialTimeout);
        clearInterval(animationInterval);
      };
    } else {
      setCartAnimation(false);
    }
    
    return () => {
      if (animationInterval) clearInterval(animationInterval);
    };
  }, [cart.length]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center py-2 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Link to="/customer-care" className="text-xs text-gray-600 hover:text-blue-600">
              Customer Care
            </Link>
            <Link to="/store-locator" className="text-xs text-gray-600 hover:text-blue-600">
              Visit Our Store
            </Link>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
                  <Avatar className="h-7 w-7 ring-1 ring-black/5">
                    <AvatarImage src={user?.avatar} className="object-cover" />
                    <AvatarFallback className="bg-black text-[11px] font-medium text-white">
                      {user?.name?.split(' ').map(word => word[0]).join('').toUpperCase() || 'D'}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-3 w-3 text-gray-400 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 p-1.5">
                  <div className="flex items-center justify-start gap-3 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} className="object-cover" />
                      <AvatarFallback className="bg-black text-xs font-medium text-white">
                        {user?.name?.split(' ').map(word => word[0]).join('').toUpperCase() || 'D'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium leading-none">{user?.name || 'Demo User'}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-100 my-1" />
                  <div className="p-1">
                    <DropdownMenuItem asChild className="py-1.5">
                      <Link to="/profile" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-3.5 w-3.5 text-gray-500" />
                        <span className="text-sm">Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="py-1.5">
                      <Link to="/settings" className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-3.5 w-3.5 text-gray-500" />
                        <span className="text-sm">Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-100 my-1" />
                  <div className="p-1">
                    <DropdownMenuItem 
                      onClick={signOut}
                      className="text-red-600 focus:text-red-600 cursor-pointer py-1.5"
                    >
                      <LogOut className="mr-2 h-3.5 w-3.5" />
                      <span className="text-sm">Sign Out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <button 
                  onClick={() => handleAuthClick('signin')}
                  className="text-xs px-3 py-1 text-gray-600 rounded transition-colors hover:text-blue-600"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleAuthClick('join')}
                  className="text-xs px-3 py-1 text-gray-600 rounded transition-colors hover:text-blue-600"
                >
                  Join
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center group">
            <svg 
              width="45" 
              height="45" 
              viewBox="0 0 45 45" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-black transform group-hover:scale-105 transition-transform duration-300"
            >
              <rect width="45" height="45" rx="10" fill="currentColor" fillOpacity="0.05"/>
              <path 
                d="M12 10H18V35H12V10ZM27 10H33V35H27V10Z" 
                fill="currentColor"
                className="text-black"
              />
              <path 
                d="M12 10H33V16H12V10Z" 
                fill="currentColor"
                className="text-black"
              />
              <path 
                d="M12 29H33V35H12V29Z" 
                fill="currentColor"
                className="text-black"
              />
              <circle cx="22.5" cy="22.5" r="2" fill="currentColor" className="text-black"/>
            </svg>
            <div className="ml-2">
              <span className="text-2xl font-black tracking-tight text-black">EP</span>
              <span className="block text-[10px] font-medium text-gray-500 tracking-widest">ELITE PALACE</span>
            </div>
          </Link>
          
          <div className="hidden md:flex flex-1 justify-center">
            <nav className="flex items-center justify-center space-x-12 text-sm font-medium text-gray-800">
              <div
                className="relative"
                onMouseEnter={() => { clearTimeout(menDropdownTimeout); closeAllDropdowns(); setIsMenDropdownOpen(true); }}
                onMouseLeave={() => { menDropdownTimeout = setTimeout(() => setIsMenDropdownOpen(false), 1000); }}
              >
                <Link to="/men/shirts" className="relative hover:text-blue-600 transition-colors after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gray-800 after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  MEN
                </Link>
                {isMenDropdownOpen && (
                  <div
                    className="fixed top-[100px] left-0 right-0 bg-gradient-to-b from-white via-white/95 to-white/90 backdrop-blur-md border-t border-gray-200 shadow-2xl z-50 animate-fadeIn"
                    onMouseEnter={() => { clearTimeout(menDropdownTimeout); setIsMenDropdownOpen(true); }}
                    onMouseLeave={() => { menDropdownTimeout = setTimeout(() => setIsMenDropdownOpen(false), 1000); }}
                  >
                    <div className="container mx-auto px-4 py-4">
                      <div className="grid grid-cols-4 gap-8">
                        {/* Clothing Section */}
                        <div className="transform transition-all duration-300 hover:scale-105 group mt-0">
                          <h3 className="font-semibold text-gray-900 mb-4 text-lg relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:left-0 after:bottom-[-4px] after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">Clothing</h3>
                          <ul className="space-y-3">
                            <li className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 rounded">
                              <Link to="/men/shirts" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group/item">
                                Shirts
                              </Link>
                            </li>
                            <li className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 rounded">
                              <Link to="/men/tshirts" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group/item">
                                T-Shirts
                              </Link>
                            </li>
                            <li className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 rounded">
                              <Link to="/men/jeans" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group/item">
                                Jeans
                              </Link>
                            </li>
                            <li className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 rounded">
                              <Link to="/men/trousers" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group/item">
                                Trousers
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* Footwear Section */}
                        <div className="transform transition-all duration-300 hover:scale-105 group mt-0">
                          <h3 className="mt-6 mb-2 text-sm font-semibold text-gray-900 tracking-wide uppercase relative after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-0.5 after:bg-blue-600 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300">Footwear</h3>
                          {/* Disabled Footwear links for Men */}
                          <div className="space-y-2">
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Sneakers</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Loafers</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Formal</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Sandals</span>
                          </div>
                        </div>
                        {/* Accessories Section */}
                        <div className="transform transition-all duration-300 hover:scale-105 group mt-0">
                          <h3 className="mt-6 mb-2 text-sm font-semibold text-gray-900 tracking-wide uppercase relative after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-0.5 after:bg-blue-600 after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300">Accessories</h3>
                          {/* Disabled Accessories links for Men */}
                          <div className="space-y-2">
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Watches</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Belts</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Wallets</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Sunglasses</span>
                          </div>
                        </div>
                        {/* Featured Section (Men) */}
                        <div className="mt-0">
                          <h3 className="font-semibold text-gray-900 mb-4 text-lg relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">Featured</h3>
                          <div className="space-y-4">
                            <div className="relative rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                              <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1000&q=80" alt="New Arrivals" className="w-full h-24 object-cover transform transition-transform duration-500 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
                                <span className="text-gray-400 font-medium transform transition-all duration-300 group-hover:scale-110 cursor-not-allowed select-none">New Arrivals</span>
                              </div>
                            </div>
                            <div className="relative rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                              <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80" alt="Sale" className="w-full h-24 object-cover transform transition-transform duration-500 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
                                <span className="text-gray-400 font-medium transform transition-all duration-300 group-hover:scale-110 cursor-not-allowed select-none">Sale</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div
                className="relative"
                onMouseEnter={() => { clearTimeout(womenDropdownTimeout); closeAllDropdowns(); setIsWomenDropdownOpen(true); }}
                onMouseLeave={() => { womenDropdownTimeout = setTimeout(() => setIsWomenDropdownOpen(false), 1000); }}
              >
                <Link to="/women/sarees" className="relative hover:text-blue-600 transition-colors after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gray-800 after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                  WOMEN
                </Link>
                
                {isWomenDropdownOpen && (
                  <div
                    className="fixed top-[100px] left-0 right-0 bg-gradient-to-b from-white via-white/95 to-white/90 backdrop-blur-md border-t border-gray-200 shadow-2xl z-50 animate-fadeIn"
                    onMouseEnter={() => { clearTimeout(womenDropdownTimeout); setIsWomenDropdownOpen(true); }}
                    onMouseLeave={() => { womenDropdownTimeout = setTimeout(() => setIsWomenDropdownOpen(false), 1000); }}
                  >
                    <div className="container mx-auto px-4 py-4">
                      <div className="grid grid-cols-4 gap-8">
                        {/* Clothing Section */}
                        <div className="transform transition-all duration-300 hover:scale-105 group mt-0">
                          <h3 className="font-semibold text-gray-900 mb-4 text-lg relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:left-0 after:bottom-[-4px] after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">Clothing</h3>
                          <ul className="space-y-3">
                            <li className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 rounded">
                              <Link to="/women/sarees" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group/item">Sarees</Link>
                            </li>
                            <li className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 rounded">
                              <Link to="/women/kurtis" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group/item">Kurtees</Link>
                            </li>
                            <li className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 rounded">
                              <Link to="/women/dresses" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group/item">Dresses</Link>
                            </li>
                            <li className="transition-all duration-200 hover:scale-105 hover:bg-gray-100 rounded">
                              <Link to="/women/tops" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group/item">Tops</Link>
                            </li>
                          </ul>
                        </div>

                        {/* Footwear Section (Women) */}
                        <div className="transform transition-all duration-300 hover:scale-105 group mt-0">
                          <h3 className="font-semibold text-gray-900 mb-4 text-lg relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:left-0 after:bottom-[-4px] after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">Footwear</h3>
                          <div className="space-y-3">
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Sandals</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Heels</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Flats</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Sneakers</span>
                          </div>
                        </div>

                        {/* Jewelry Section (Women) */}
                        <div className="transform transition-all duration-300 hover:scale-105 group mt-0">
                          <h3 className="font-semibold text-gray-900 mb-4 text-lg relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:left-0 after:bottom-[-4px] after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300">Jewelry</h3>
                          <div className="space-y-3">
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Traditional Jewelry</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Modern Jewelry</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Earrings</span>
                            <span className="text-gray-400 flex items-center group/item cursor-not-allowed select-none">Necklaces</span>
                          </div>
                        </div>

                        {/* Featured Section (Women) */}
                        <div className="mt-0">
                          <h3 className="font-semibold text-gray-900 mb-4 text-lg relative inline-block after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:left-0 after:bottom-[-4px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">Featured</h3>
                          <div className="space-y-4">
                            <div className="relative rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                              <img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80" alt="New Arrivals" className="w-full h-24 object-cover transform transition-transform duration-500 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
                                <span className="text-gray-400 font-medium transform transition-all duration-300 group-hover:scale-110 cursor-not-allowed select-none">New Arrivals</span>
                              </div>
                            </div>
                            <div className="relative rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80" alt="Sale" className="w-full h-24 object-cover transform transition-transform duration-500 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
                                <span className="text-gray-400 font-medium transform transition-all duration-300 group-hover:scale-110 cursor-not-allowed select-none">Sale</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <span className="relative text-gray-400 cursor-not-allowed select-none pointer-events-none">KIDS</span>
              
              <span className="relative text-gray-400 cursor-not-allowed select-none pointer-events-none">BEAUTY</span>
              
              <span className="relative text-gray-400 cursor-not-allowed select-none pointer-events-none">HOME & KITCHEN</span>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                className="border border-gray-300 rounded-md py-2 px-4 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                placeholder="Search EP"
                type="text"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay hiding suggestions to allow clicking them
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchTerm.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                    setShowSuggestions(false);
                  }
                }}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                onClick={() => {
                  if (searchTerm.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                    setShowSuggestions(false);
                  }
                }}
                aria-label="Search"
                type="button"
              >
                <Search className="w-4 h-4" />
              </button>
              <SearchSuggestions
                query={searchTerm}
                visible={showSuggestions}
                onSelect={(suggestion) => {
                  setSearchTerm(suggestion);
                  setShowSuggestions(false);
                }}
              />
            </div>
            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
              {wishlist.length > 0 && (
                <span className={`absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center ${shake ? 'animate-bounce' : ''}`}>
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link 
              to="/cart" 
              className={`relative p-2 rounded-full hover:bg-gray-100 transition-all ${
                cartAnimation && cart.length > 0 
                  ? 'animate-cart-attention' 
                  : ''
              }`}
            >
              <div className={`absolute inset-0 rounded-full ${cartAnimation && cart.length > 0 ? 'bg-blue-50/50 backdrop-blur-sm' : 'bg-transparent'}`}></div>
              <ShoppingBag 
                className={`w-5 h-5 relative z-10 transition-colors duration-300 ${
                  cartAnimation && cart.length > 0 ? 'text-blue-600' : 'text-gray-600'
                }`} 
              />
              {cart.length > 0 && (
                <span className={`absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center shadow-sm ${
                  cartAnimation ? 'animate-cart-badge-pulse' : ''
                }`}>
                  {cart.reduce((sum, ci) => sum + ci.quantity, 0)}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-gray-800">
              <Link to="/men/shirts" className="py-2 hover:text-blue-600 transition-colors">MEN</Link>
              <Link to="/women/sarees" className="py-2 hover:text-blue-600 transition-colors">WOMEN</Link>
              <Link to="/beauty" className="py-2 hover:text-blue-600 transition-colors">BEAUTY</Link>
              <Link to="/home" className="py-2 hover:text-blue-600 transition-colors">HOME & KITCHEN</Link>
            </nav>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 py-3">
        <div className="container mx-auto px-4 flex items-center justify-center space-x-4">
          <div className="text-2xl font-bold text-blue-600">🔥</div>
          <p className="text-sm text-gray-800 font-medium">
            Big Bold Sale is Live! <span className="text-blue-600">Buy your favorite products at jaw-dropping discounts!</span>
          </p>
        </div>
      </div>

      <AuthDialog 
        isOpen={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        type={authDialogType}
      />
    </header>
  );
};

export default Header;
