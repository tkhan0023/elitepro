import { useState, useCallback, useMemo } from 'react';
import { Product } from '@/types';

interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export const useFilter = (products: Product[] = []) => {
  const [filters, setFilters] = useState<FilterOptions>({});

  const applyFilters = useCallback((products: Product[]) => {
    return products.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      if (filters.brands?.length && !filters.brands.includes(product.brand)) return false;
      if (filters.rating && product.rating < filters.rating) return false;
      if (filters.inStock && !product.inStock) return false;
      return true;
    });
  }, [filters]);

  const sortProducts = useCallback((products: Product[]) => {
    const sortedProducts = [...products];
    switch (filters.sortBy) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sortedProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return sortedProducts;
    }
  }, [filters.sortBy]);

  const filteredProducts = useMemo(() => {
    const filtered = applyFilters(products);
    return sortProducts(filtered);
  }, [products, applyFilters, sortProducts]);

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const getAvailableBrands = useMemo(() => {
    return Array.from(new Set(products.map(product => product.brand)));
  }, [products]);

  const getPriceRange = useMemo(() => {
    if (!products.length) return { min: 0, max: 0 };
    const prices = products.map(product => product.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  return {
    filters,
    updateFilters,
    clearFilters,
    filteredProducts,
    getAvailableBrands,
    getPriceRange,
  };
}; 