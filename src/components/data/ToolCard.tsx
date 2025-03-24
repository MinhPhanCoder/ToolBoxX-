import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  path: string;
  gradient?: string;
  stats?: {
    label: string;
    value: string | number;
  }[];
  className?: string;
}
const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  image,
  path,
  gradient = 'from-primary-500 to-primary-600',
  stats,
  className = ''
}) => {
  return <Link to={path}>
      <Card className={`
          group hover:shadow-lg transition-all duration-200
          cursor-pointer overflow-hidden ${className}
        `}>
        <div className="relative">
          {/* Background Pattern */}
          <div className={`
              absolute inset-0 bg-gradient-to-r ${gradient} opacity-10
              group-hover:opacity-20 transition-opacity duration-200
            `} />
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient}`}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            {/* Content */}
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {description}
            </p>
            {/* Stats */}
            {stats && <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {stats.map((stat, index) => <div key={index}>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>)}
              </div>}
          </div>
          {/* Image */}
          {image && <div className="relative h-48 mt-4">
              <img src={image} alt={title} className="w-full h-full object-cover rounded-b-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-b-lg" />
            </div>}
        </div>
      </Card>
    </Link>;
};
export default ToolCard;