import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';
interface BreadcrumbItem {
  label: string;
  href?: string;
}
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  homeLink?: string;
  className?: string;
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  homeLink = '/',
  className = ''
}) => {
  return <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to={homeLink} className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
            <HomeIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
        </li>
        {items.map((item, index) => <li key={index} className="flex items-center">
            <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-600" aria-hidden="true" />
            {item.href ? <Link to={item.href} className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                {item.label}
              </Link> : <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </span>}
          </li>)}
      </ol>
    </nav>;
};
export default Breadcrumb;