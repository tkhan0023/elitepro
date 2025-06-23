import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User, Cart, WishlistItem, Notification, Theme } from '../types';

// Demo users
const DEMO_USERS = [
  {
    email: 'demo@example.com',
    password: '123',
    name: 'Demo User',
  },
  {
    email: 'test@example.com',
    password: '123',
    name: 'Test User',
  },
];

// Initial state
const initialState = {
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  } as AuthState,
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  } as Cart,
  wishlist: [] as WishlistItem[],
  notifications: [] as Notification[],
  theme: 'light' as Theme,
};

// Action types
type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_AUTH_LOADING'; payload: boolean }
  | { type: 'SET_AUTH_ERROR'; payload: string | null }
  | { type: 'ADD_TO_CART'; payload: Cart['items'][0] }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'SET_THEME'; payload: Theme };

// Reducer
function appReducer(state: typeof initialState, action: Action): typeof initialState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
          isAuthenticated: !!action.payload,
          isLoading: false,
          error: null,
        },
      };

    case 'SET_AUTH_LOADING':
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: action.payload,
        },
      };

    case 'SET_AUTH_ERROR':
      return {
        ...state,
        auth: {
          ...state.auth,
          error: action.payload,
          isLoading: false,
        },
      };

    case 'ADD_TO_CART': {
      const existingItem = state.cart.items.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (existingItem) {
        const updatedItems = state.cart.items.map((item) =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );

        return {
          ...state,
          cart: {
            items: updatedItems,
            total: updatedItems.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            ),
            itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          },
        };
      }

      const newItems = [...state.cart.items, action.payload];
      return {
        ...state,
        cart: {
          items: newItems,
          total: newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ),
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        },
      };
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.cart.items.filter(
        (item) => item.product.id !== action.payload
      );
      return {
        ...state,
        cart: {
          items: updatedItems,
          total: updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        },
      };
    }

    case 'UPDATE_CART_ITEM': {
      const updatedItems = state.cart.items.map((item) =>
        item.product.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        cart: {
          items: updatedItems,
          total: updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          ),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        },
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: {
          items: [],
          total: 0,
          itemCount: 0,
        },
      };

    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.product.id !== action.payload
        ),
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        wishlist: [],
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };

    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}>({
  state: initialState,
  dispatch: () => null,
  signInWithEmail: async () => {},
  signOut: () => {},
});

// Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Removed signInWithDemo as we only use email/password login

  const signInWithEmail = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_AUTH_LOADING', payload: true });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const demoUser = DEMO_USERS.find(user => user.email === email && user.password === password);
      
      if (!demoUser) {
        throw new Error('Invalid credentials');
      }
      
      const user: User = {
        id: `${demoUser.email}-id`,
        email: demoUser.email,
        name: demoUser.name,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      dispatch({ type: 'SET_USER', payload: user });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      dispatch({ type: 'SET_AUTH_ERROR', payload: 'Invalid email or password' });
    }
  };

  const signOut = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'CLEAR_WISHLIST' });
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
  };

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(state.theme);
  }, [state.theme]);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, signInWithEmail, signOut }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hooks
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const useAuth = () => {
  const { state, signInWithEmail, signOut } = useApp();
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    signInWithEmail,
    signOut,
  };
};

export const useCart = () => {
  const { state, dispatch } = useApp();
  return {
    items: state.cart.items,
    total: state.cart.total,
    itemCount: state.cart.itemCount,
    addItem: (item: Cart['items'][0]) =>
      dispatch({ type: 'ADD_TO_CART', payload: item }),
    removeItem: (id: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),
    updateItem: (id: string, quantity: number) =>
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { id, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  };
};

export const useWishlist = () => {
  const { state, dispatch } = useApp();
  return {
    items: state.wishlist,
    addItem: (item: WishlistItem) =>
      dispatch({ type: 'ADD_TO_WISHLIST', payload: item }),
    removeItem: (id: string) =>
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id }),
    clearWishlist: () => dispatch({ type: 'CLEAR_WISHLIST' }),
  };
};

export const useNotifications = () => {
  const { state, dispatch } = useApp();
  return {
    notifications: state.notifications,
    addNotification: (notification: Notification) =>
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    removeNotification: (id: string) =>
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
  };
};

export const useTheme = () => {
  const { state, dispatch } = useApp();
  return {
    theme: state.theme,
    setTheme: (theme: Theme) => dispatch({ type: 'SET_THEME', payload: theme }),
  };
}; 