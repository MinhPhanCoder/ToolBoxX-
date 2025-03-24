import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
interface SelectOption {
  label: string;
  value: string;
}
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
}
const Select: React.FC<SelectProps> = ({
  options,
  label,
  error,
  fullWidth = false,
  size = 'md',
  leftIcon,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  const sizeClasses = {
    sm: 'py-1 text-sm',
    md: 'py-2',
    lg: 'py-3 text-lg'
  };
  return <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>}
      <div className="relative">
        {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>}
        <select id={selectId} className={`
            block bg-white dark:bg-gray-800 
            border rounded-md shadow-sm 
            focus:ring-primary-500 focus:border-primary-500
            dark:focus:ring-primary-500 dark:focus:border-primary-500
            ${leftIcon ? 'pl-10' : 'pl-3'}
            pr-10
            ${error ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-600'}
            ${sizeClasses[size]}
            ${fullWidth ? 'w-full' : ''}
            text-gray-900 dark:text-white
          `} {...props}>
          {options.map(option => <option key={option.value} value={option.value}>
              {option.label}
            </option>)}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDownIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>;
};
export default Select;