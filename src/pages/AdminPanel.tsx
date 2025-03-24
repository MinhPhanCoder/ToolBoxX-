import React, { useState } from 'react';
import { UsersIcon, ShieldIcon, SettingsIcon, AlertTriangleIcon, ActivityIcon, DatabaseIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}
const AdminPanel = () => {
  const {
    t
  } = useLanguage();
  const {
    isAdmin
  } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  // Mock data
  const stats = {
    totalUsers: 1234,
    activeUsers: 892,
    newUsers: 45,
    systemLoad: 32,
    storageUsed: 68,
    errors: 3
  };
  const recentUsers: User[] = [{
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2023-12-01T10:30:00'
  }, {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2023-12-01T09:15:00'
  }, {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2023-11-30T15:45:00'
  }];
  if (!isAdmin) {
    return <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="text-center">
          <ShieldIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-500">
            You don't have permission to access this page.
          </p>
        </div>
      </div>;
  }
  return <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('adminPanel')}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage system settings and monitor user activity.
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center">
            <UsersIcon size={24} className="text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalUsers}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <div className="flex items-center">
            <ActivityIcon size={24} className="text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.activeUsers}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
          <div className="flex items-center">
            <AlertTriangleIcon size={24} className="text-red-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">System Errors</p>
              <p className="text-2xl font-bold text-gray-900">{stats.errors}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map(user => <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <UsersIcon size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* System Status */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">System Status</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                System Load
              </span>
              <span className="text-sm font-medium text-gray-900">
                {stats.systemLoad}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{
              width: `${stats.systemLoad}%`
            }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Storage Used
              </span>
              <span className="text-sm font-medium text-gray-900">
                {stats.storageUsed}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{
              width: `${stats.storageUsed}%`
            }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AdminPanel;