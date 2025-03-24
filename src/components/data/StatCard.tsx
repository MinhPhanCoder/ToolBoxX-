import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import Card from '../ui/Card';
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  description?: string;
  className?: string;
}
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  description,
  className = ''
}) => {
  return <Card className={`relative overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
          {icon && <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              {icon}
            </div>}
        </div>
        {(change || description) && <div className="mt-4">
            {change && <div className="flex items-center">
                <div className={`flex items-center ${change.type === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {change.type === 'increase' ? <ArrowUpIcon size={20} className="mr-1" /> : <ArrowDownIcon size={20} className="mr-1" />}
                  <span className="font-medium">{Math.abs(change.value)}%</span>
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  from previous period
                </span>
              </div>}
            {description && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>}
          </div>}
      </div>
    </Card>;
};
export default StatCard;