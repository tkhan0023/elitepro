export interface Product {
  id: string | number;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  isBestseller?: boolean;
  tags?: string[];
  gender?: string;
  category?: string;
  sizes?: string[];
  description?: string;
  features?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';
  details: Record<string, any>;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  image: string;
  description?: string;
  parentId?: string;
  subcategories?: Category[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  helpful?: number;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
  status: number;
}

export interface FilterOptions {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';
  colors?: string[];
  sizes?: string[];
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export type Theme = 'light' | 'dark' | 'system';

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface WithChildren {
  children: React.ReactNode;
}

export interface LayoutProps extends BaseProps, WithChildren {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signInWithDemo?: () => Promise<void>;
  signOut?: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, any>;
}

export interface MenuItem {
  title: string;
  link: string;
  items?: MenuItem[];
}

export interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "signin" | "join";
}

export interface ProductCardProps {
  product: Product;
}

export interface FeaturedCategoriesProps {
  categories: Category[];
} 