import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingProps {
  variant?: 'default' | 'spinner' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  variant = 'default',
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const variants = {
    default: (
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-gray-200 border-t-blue-600',
          sizeClasses[size],
          className
        )}
      />
    ),
    spinner: (
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-200 border-t-blue-600',
          sizeClasses[size],
          className
        )}
      />
    ),
    dots: (
      <div className={cn('flex space-x-2', className)}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'animate-bounce rounded-full bg-blue-600',
              size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    ),
    pulse: (
      <div
        className={cn(
          'animate-pulse rounded-full bg-blue-600',
          sizeClasses[size],
          className
        )}
      />
    ),
  };

  return variants[variant];
};

export default Loading; 