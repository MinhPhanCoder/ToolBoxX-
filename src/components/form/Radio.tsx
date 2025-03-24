import React from 'react';
interface RadioOption {
  label: string;
  value: string;
}
interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  className?: string;
}
const Radio: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  error,
  className = ''
}) => {
  return <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>}
      <div className="space-y-2">
        {options.map(option => <div key={option.value} className="flex items-center">
            <input id={`${name}-${option.value}`} name={name} type="radio" value={option.value} checked={value === option.value} onChange={e => onChange?.(e.target.value)} className={`
                h-4 w-4 border-gray-300 dark:border-gray-600
                text-primary-600 focus:ring-primary-500
                dark:bg-gray-700
                ${error ? 'border-red-300 dark:border-red-700' : ''}
              `} />
            <label htmlFor={`${name}-${option.value}`} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {option.label}
            </label>
          </div>)}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>;
};
export default Radio;