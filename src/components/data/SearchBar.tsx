import React, { useEffect, useState, useRef } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
interface SearchResult {
  id: string;
  title: string;
  type: string;
  path: string;
  icon?: React.ReactNode;
}
interface SearchBarProps {
  onSearch: (term: string) => void;
  results?: SearchResult[];
  loading?: boolean;
  placeholder?: string;
  className?: string;
}
const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  results = [],
  loading = false,
  placeholder = 'Search...',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
    setIsOpen(true);
  };
  return <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <input type="text" className={`
            w-full pl-10 pr-4 py-2 
            bg-white dark:bg-gray-800
            border border-gray-300 dark:border-gray-600
            rounded-lg
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            transition-colors duration-200
          `} placeholder={placeholder} value={searchTerm} onChange={e => handleSearch(e.target.value)} onFocus={() => setIsOpen(true)} />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        </div>
        {searchTerm && <button className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => {
        setSearchTerm('');
        onSearch('');
        setIsOpen(false);
      }}>
            <XIcon className="h-5 w-5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" aria-hidden="true" />
          </button>}
      </div>
      {isOpen && (searchTerm || loading) && <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {loading ? <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
            </div> : results.length > 0 ? <div className="py-2">
              {results.map(result => <a key={result.id} href={result.path} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {result.icon && <span className="mr-3 text-gray-400 dark:text-gray-500">
                      {result.icon}
                    </span>}
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {result.type}
                    </div>
                  </div>
                </a>)}
            </div> : <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found
            </div>}
        </div>}
    </div>;
};
export default SearchBar;