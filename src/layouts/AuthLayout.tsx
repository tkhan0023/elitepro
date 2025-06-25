import React from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutProps } from '../types';
import { useTheme } from '../store/AppContext';

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 ${theme}`}>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Elite Palace
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your one-stop destination for premium fashion
          </p>
        </div>
        <div className="mt-8">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 