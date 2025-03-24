import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  return <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>}
      <div className="relative">
        {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>}
        <input id={inputId} className={`
            block bg-white dark:bg-gray-800 border rounded-md shadow-sm 
            focus:ring-primary-500 focus:border-primary-500 
            dark:focus:ring-primary-500 dark:focus:border-primary-500
            sm:text-sm transition-colors
            ${leftIcon ? 'pl-10' : 'pl-4'}
            ${rightIcon ? 'pr-10' : 'pr-4'}
            ${error ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'}
            py-2 w-full
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
          `} aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? `${inputId}-error` : undefined} {...props} />
        {rightIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400" id={`${inputId}-error`}>
          {error}
        </p>}
    </div>;
};
export default Input;