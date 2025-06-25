import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { useAuth } from '@/store/AppContext';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string | number) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (!isAuthenticated || !user?.id) return [];
    const stored = localStorage.getItem(`wishlist_${user.id}`);
    return stored ? (JSON.parse(stored) as Product[]) : [];
  });

  // Load wishlist when user logs in
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      const stored = localStorage.getItem(`wishlist_${user.id}`);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    }
  }, [isAuthenticated, user?.id]);

  // Clear wishlist when user logs out
  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setWishlist([]);
    }
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      if (wishlist.length > 0) {
        localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
      } else {
        localStorage.removeItem(`wishlist_${user.id}`);
      }
    }
  }, [wishlist, isAuthenticated, user?.id]);

  const addToWishlist = (product: Product) => {
    if (!isAuthenticated || !user?.id) return;
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev; // avoid duplicates
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string | number) => {
    if (!isAuthenticated || !user?.id) return;
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
    if (user?.id) {
      localStorage.removeItem(`wishlist_${user.id}`);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
