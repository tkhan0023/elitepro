import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';

const fetchProducts = async (category?: string): Promise<Product[]> => {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/products${category ? `?category=${category}` : ''}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  });
};

const fetchProductById = async (id: string): Promise<Product> => {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });
}; 