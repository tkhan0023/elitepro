import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { useAuth } from '@/store/AppContext';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  updateQuantity: (productId: string | number, size: string, quantity: number) => void;
  removeFromCart: (productId: string | number, size: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (!isAuthenticated || !user?.id) return [];
    const stored = localStorage.getItem(`cart_${user.id}`);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  });

  // Load cart when user logs in
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      const stored = localStorage.getItem(`cart_${user.id}`);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    }
  }, [isAuthenticated, user?.id]);

  // Clear cart when user logs out
  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setCart([]);
    }
  }, [isAuthenticated, user?.id]);

  // persist cart to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      if (cart.length > 0) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
      } else {
        localStorage.removeItem(`cart_${user.id}`);
      }
    }
  }, [cart, isAuthenticated, user?.id]);

  const addToCart = (product: Product, size: string, quantity: number) => {
    if (!isAuthenticated || !user?.id) return;
    setCart(prev => {
      const existing = prev.find(ci => ci.product.id === product.id && ci.size === size);
      if (existing) {
        return prev.map(ci =>
          ci === existing ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...prev, { product, size, quantity }];
    });
  };

  const updateQuantity = (productId: string | number, size: string, quantity: number) => {
    if (!isAuthenticated || !user?.id) return;
    setCart(prev =>
      prev.map(ci =>
        ci.product.id === productId && ci.size === size ? { ...ci, quantity } : ci
      )
    );
  };

  const removeFromCart = (productId: string | number, size: string) => {
    if (!isAuthenticated || !user?.id) return;
    setCart(prev => prev.filter(ci => !(ci.product.id === productId && ci.size === size)));
  };

  const clearCart = () => {
    setCart([]);
    if (user?.id) {
      localStorage.removeItem(`cart_${user.id}`);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
