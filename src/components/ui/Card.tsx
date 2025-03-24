import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  border?: boolean;
  shadow?: boolean;
}
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'medium',
  border = true,
  shadow = true
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-3',
    medium: 'p-4 sm:p-6',
    large: 'p-6 sm:p-8'
  };
  return <div className={`
        bg-white dark:bg-gray-800 
        ${border ? 'border border-gray-200 dark:border-gray-700' : ''} 
        ${shadow ? 'shadow-sm' : ''}
        ${paddingClasses[padding]}
        rounded-lg
        transition-colors duration-200
        ${className}
      `}>
      {children}
    </div>;
};
export default Card;