import React, { useEffect, useState } from 'react';
import { ClockIcon, FilterIcon, RefreshCwIcon, UserIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
interface LoginRecord {
  id: number;
  timestamp: string;
  device: string;
  location: string;
  status: 'success' | 'failed';
  ipAddress: string;
}
const LoginHistory = () => {
  const {
    t
  } = useLanguage();
  const {
    currentUser
  } = useAuth();
  const [loginData, setLoginData] = useState<LoginRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  // Mock data generator
  const generateLoginData = () => {
    const devices = ['Windows PC', 'MacBook Pro', 'iPhone 13', 'Android Device', 'iPad'];
    const locations = ['New York, US', 'London, UK', 'Tokyo, JP', 'Paris, FR', 'Sydney, AU'];
    const data: LoginRecord[] = [];
    for (let i = 0; i < 20; i++) {
      const date = new Date();
      date.setHours(date.getHours() - i * Math.floor(Math.random() * 24));
      data.push({
        id: i + 1,
        timestamp: date.toISOString(),
        device: devices[Math.floor(Math.random() * devices.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        status: Math.random() > 0.1 ? 'success' : 'failed',
        ipAddress: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
      });
    }
    return data;
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoginData(generateLoginData());
      } catch (error) {
        console.error('Error fetching login history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLoginData(generateLoginData());
      setIsLoading(false);
    }, 1000);
  };
  const filteredData = loginData.filter(record => filter === 'all' || record.status === filter);
  return <div className="w-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('loginHistory')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your account login activity and security events.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button onClick={refreshData} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={isLoading}>
            <RefreshCwIcon size={16} className="mr-2" />
            Refresh History
          </button>
        </div>
      </div>
      {/* Filters */}
      <div className="flex items-center mb-4 gap-4">
        <FilterIcon size={16} className="text-gray-500" />
        <div className="flex space-x-2">
          <button onClick={() => setFilter('all')} className={`px-3 py-1 text-sm rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            All
          </button>
          <button onClick={() => setFilter('success')} className={`px-3 py-1 text-sm rounded-md ${filter === 'success' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Successful
          </button>
          <button onClick={() => setFilter('failed')} className={`px-3 py-1 text-sm rounded-md ${filter === 'failed' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Failed
          </button>
        </div>
      </div>
      {/* Login History Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div> : <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map(record => <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserIcon size={16} className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {record.device}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {record.status === 'success' ? 'Successful' : 'Failed'}
                      </span>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>
    </div>;
};
export default LoginHistory;