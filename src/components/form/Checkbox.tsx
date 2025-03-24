import React from 'react';
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  return <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input id={checkboxId} type="checkbox" className={`
            h-4 w-4 rounded border-gray-300 dark:border-gray-600
            text-primary-600 focus:ring-primary-500
            dark:bg-gray-700 dark:checked:bg-primary-600
            ${error ? 'border-red-300 dark:border-red-700' : ''}
          `} {...props} />
      </div>
      {label && <div className="ml-3 text-sm">
          <label htmlFor={checkboxId} className="font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>}
        </div>}
    </div>;
};
export default Checkbox;