import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DatabaseIcon, RefreshCwIcon, CheckCircleIcon, XCircleIcon, UserIcon, CalendarIcon, TagIcon } from 'lucide-react';
import Table from '../data/Table';
import Card from '../ui/Card';
import StatCard from '../data/StatCard';
import Button from '../ui/Button';
import SearchBar from '../data/SearchBar';
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  department: string;
}
const mockUsers: User[] = Array.from({
  length: 50
}, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Editor'][Math.floor(Math.random() * 3)],
  status: Math.random() > 0.3 ? 'active' : 'inactive',
  lastLogin: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  department: ['Sales', 'Marketing', 'Engineering', 'Support'][Math.floor(Math.random() * 4)]
}));
const DataTableTool: React.FC = () => {
  const {
    t
  } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>(mockUsers);
  const handleSearch = (term: string) => {
    const filtered = mockUsers.filter(user => Object.values(user).some(value => String(value).toLowerCase().includes(term.toLowerCase())));
    setSearchResults(filtered);
  };
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const columns = [{
    key: 'name' as const,
    title: 'Name',
    sortable: true,
    render: (value: string, user: User) => <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
            <UserIcon size={16} className="text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </div>
          </div>
        </div>
  }, {
    key: 'role' as const,
    title: 'Role',
    sortable: true,
    render: (value: string) => <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
          {value}
        </span>
  }, {
    key: 'department' as const,
    title: 'Department',
    sortable: true
  }, {
    key: 'status' as const,
    title: 'Status',
    sortable: true,
    render: (value: string) => <span className={`inline-flex items-center ${value === 'active' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
          {value === 'active' ? <CheckCircleIcon size={16} className="mr-1" /> : <XCircleIcon size={16} className="mr-1" />}
          {value}
        </span>
  }, {
    key: 'lastLogin' as const,
    title: 'Last Login',
    sortable: true,
    render: (value: string) => <div className="flex items-center text-gray-500 dark:text-gray-400">
          <CalendarIcon size={16} className="mr-1" />
          {new Date(value).toLocaleDateString()}
        </div>
  }];
  return <Card>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <DatabaseIcon size={24} className="text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Data Management
            </h2>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} isLoading={loading} leftIcon={!loading ? <RefreshCwIcon size={16} /> : undefined}>
            Refresh Data
          </Button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Users" value={mockUsers.length} icon={<UserIcon size={20} className="text-primary-500" />} change={{
          value: 12,
          type: 'increase'
        }} />
          <StatCard title="Active Users" value={mockUsers.filter(u => u.status === 'active').length} icon={<CheckCircleIcon size={20} className="text-green-500" />} change={{
          value: 8,
          type: 'increase'
        }} />
          <StatCard title="Departments" value="4" icon={<TagIcon size={20} className="text-purple-500" />} />
        </div>
        {/* Search */}
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearch} placeholder="Search users..." loading={loading} />
        </div>
        {/* Table */}
        <Table data={searchResults} columns={columns} searchable filterable pagination itemsPerPage={10} />
      </div>
    </Card>;
};
export default DataTableTool;