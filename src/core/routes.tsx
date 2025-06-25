import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/AppContext';
import { LayoutProps } from '../types';

// Layouts
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));

// Pages
const Home = lazy(() => import('../pages/Home'));
const ProductListing = lazy(() => import('../pages/ProductListing'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Profile = lazy(() => import('../pages/auth/Profile'));
const Orders = lazy(() => import('../pages/auth/Orders'));
const NotFound = lazy(() => import('../pages/NotFound'));
const MenShirts = lazy(() => import('../pages/MenShirts'));
const MenShirtDetail = lazy(() => import('../pages/MenShirtDetail'));
const SearchResults = lazy(() => import('../pages/SearchResults'));

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Replace with proper loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Layout Wrapper Component
const LayoutWrapper: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainLayout {...props}>{children}</MainLayout>
    </Suspense>
  );
};

// Auth Layout Wrapper Component
const AuthLayoutWrapper: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthLayout {...props}>{children}</AuthLayout>
    </Suspense>
  );
};

// Routes Configuration
export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <LayoutWrapper>
              <Home />
            </LayoutWrapper>
          }
        />
        <Route
          path="/products"
          element={
            <LayoutWrapper>
              <ProductListing />
            </LayoutWrapper>
          }
        />
        <Route
          path="/products/:id"
          element={
            <LayoutWrapper>
              <ProductDetail />
            </LayoutWrapper>
          }
        />
        <Route
          path="/cart"
          element={
            <LayoutWrapper>
              <Cart />
            </LayoutWrapper>
          }
        />
        <Route
          path="/men/shirts"
          element={
            <LayoutWrapper>
              <MenShirts />
            </LayoutWrapper>
          }
        />
        <Route
          path="/menshirt/:id"
          element={
            <LayoutWrapper>
              <MenShirtDetail />
            </LayoutWrapper>
          }
        />
        <Route
          path="/search"
          element={
            <LayoutWrapper>
              <SearchResults />
            </LayoutWrapper>
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <AuthLayoutWrapper>
              <Login />
            </AuthLayoutWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayoutWrapper>
              <Register />
            </AuthLayoutWrapper>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/wishlist"
          element={
            <LayoutWrapper>
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            </LayoutWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <LayoutWrapper>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </LayoutWrapper>
          }
        />
        <Route
          path="/orders"
          element={
            <LayoutWrapper>
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            </LayoutWrapper>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <LayoutWrapper>
              <NotFound />
            </LayoutWrapper>
          }
        />
      </Routes>
    </Suspense>
  );
}; 