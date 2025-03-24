import React, { useMemo, useState, createElement } from 'react';
import { ChevronUpIcon, ChevronDownIcon, SearchIcon, FilterIcon, DownloadIcon, SortAscIcon, SortDescIcon } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../form/Select';
import Pagination from '../navigation/Pagination';
interface Column<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  onRowClick?: (item: T) => void;
  className?: string;
}
function Table<T extends {
  id: string | number;
}>({
  data,
  columns,
  searchable = true,
  filterable = true,
  pagination = true,
  itemsPerPage = 10,
  onRowClick,
  className = ''
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({
    key: null,
    direction: 'asc'
  });
  const [filters, setFilters] = useState<Record<string, string>>({});
  // Filter data based on search term and filters
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Apply search
      if (searchTerm) {
        const searchString = Object.values(item).join(' ').toLowerCase();
        if (!searchString.includes(searchTerm.toLowerCase())) {
          return false;
        }
      }
      // Apply filters
      for (const [key, value] of Object.entries(filters)) {
        if (value && String(item[key as keyof T]).toLowerCase() !== value.toLowerCase()) {
          return false;
        }
      }
      return true;
    });
  }, [data, searchTerm, filters]);
  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);
  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, pagination, itemsPerPage]);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const handleSort = (key: keyof T) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  const handleExport = () => {
    const csv = [columns.map(col => col.title), ...sortedData.map(item => columns.map(col => String(item[col.key])))].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], {
      type: 'text/csv'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {searchable && <div className="w-full sm:w-64">
            <Input placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} leftIcon={<SearchIcon size={16} />} fullWidth />
          </div>}
        <div className="flex gap-2">
          {filterable && <Button variant="outline" size="sm" leftIcon={<FilterIcon size={16} />} onClick={() => {
          /* Toggle filter panel */
        }}>
              Filters
            </Button>}
          <Button variant="outline" size="sm" leftIcon={<DownloadIcon size={16} />} onClick={handleExport}>
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map(column => <th key={String(column.key)} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable && <button onClick={() => handleSort(column.key)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        {sortConfig.key === column.key ? sortConfig.direction === 'asc' ? <SortAscIcon size={14} /> : <SortDescIcon size={14} /> : <ChevronUpIcon size={14} className="text-gray-400" />}
                      </button>}
                  </div>
                </th>)}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map(item => <tr key={item.id} onClick={() => onRowClick?.(item)} className={`
                  ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
                  transition-colors duration-150
                `}>
                {columns.map(column => <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                  </td>)}
              </tr>)}
          </tbody>
        </table>
      </div>
      {pagination && totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </div>;
}
export default Table;