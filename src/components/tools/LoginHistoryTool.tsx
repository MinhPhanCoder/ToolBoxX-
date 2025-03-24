import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ClockIcon, RefreshCwIcon, FilterIcon, UserIcon, GlobeIcon } from 'lucide-react';
import Button from '../ui/Button';
interface LoginEvent {
  id: string;
  userId: string;
  username: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  browser: string;
  location: string;
  status: 'success' | 'failed';
}
const LoginHistoryTool: React.FC = () => {
  const {
    t
  } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<LoginEvent[]>([]);
  const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all');
  useEffect(() => {
    setLoading(true);
    const generateMockEvents = () => {
      const mockEvents: LoginEvent[] = [];
      const today = new Date();
      const devices = ['Desktop', 'Mobile', 'Tablet'];
      const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
      const locations = ['New York, US', 'London, UK', 'Tokyo, JP', 'Sydney, AU', 'Berlin, DE'];
      const statuses: ('success' | 'failed')[] = ['success', 'failed'];
      for (let i = 0; i < 20; i++) {
        const timestamp = new Date(today);
        timestamp.setHours(timestamp.getHours() - i * Math.floor(Math.random() * 5));
        const status = Math.random() > 0.2 ? 'success' : 'failed';
        mockEvents.push({
          id: `login-${i}`,
          userId: `user-${Math.floor(Math.random() * 10) + 1}`,
          username: `user${Math.floor(Math.random() * 10) + 1}@example.com`,
          timestamp: timestamp.toISOString(),
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          device: devices[Math.floor(Math.random() * devices.length)],
          browser: browsers[Math.floor(Math.random() * browsers.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          status: status
        });
      }
      return mockEvents;
    };
    const mockEvents = generateMockEvents();
    setEvents(mockEvents);
    setLoading(false);
  }, []);
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const mockEvents = generateMockEvents();
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  };
  const generateMockEvents = () => {
    const mockEvents: LoginEvent[] = [];
    const today = new Date();
    const devices = ['Desktop', 'Mobile', 'Tablet'];
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
    const locations = ['New York, US', 'London, UK', 'Tokyo, JP', 'Sydney, AU', 'Berlin, DE'];
    for (let i = 0; i < 20; i++) {
      const timestamp = new Date(today);
      timestamp.setHours(timestamp.getHours() - i * Math.floor(Math.random() * 5));
      const status = Math.random() > 0.2 ? 'success' : 'failed';
      mockEvents.push({
        id: `login-${i}`,
        userId: `user-${Math.floor(Math.random() * 10) + 1}`,
        username: `user${Math.floor(Math.random() * 10) + 1}@example.com`,
        timestamp: timestamp.toISOString(),
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        device: devices[Math.floor(Math.random() * devices.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        status: status
      });
    }
    return mockEvents;
  };
  const filteredEvents = filter === 'all' ? events : events.filter(event => event.status === filter);
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <ClockIcon size={24} className="text-blue-500 dark:text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {t('loginHistory')}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <button onClick={() => setFilter('all')} className={`px-3 py-1 text-sm font-medium rounded-md ${filter === 'all' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              All
            </button>
            <button onClick={() => setFilter('success')} className={`px-3 py-1 text-sm font-medium rounded-md ${filter === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              Success
            </button>
            <button onClick={() => setFilter('failed')} className={`px-3 py-1 text-sm font-medium rounded-md ${filter === 'failed' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              Failed
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} isLoading={loading} leftIcon={!loading ? <RefreshCwIcon size={16} /> : undefined}>
            Refresh
          </Button>
        </div>
      </div>
      {loading ? <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div> : <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Device
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEvents.map(event => <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserIcon size={16} className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {event.username}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {event.userId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <ClockIcon size={16} className="mr-1 text-gray-400 dark:text-gray-500" />
                      {new Date(event.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <GlobeIcon size={16} className="mr-1 text-gray-400 dark:text-gray-500" />
                      <span>{event.location}</span>
                      <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                        {event.ipAddress}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {event.device} / {event.browser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event.status === 'success' ? <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Success
                      </span> : <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                        Failed
                      </span>}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Security Tips
        </h3>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm space-y-1">
          <li>
            Review your login history regularly to detect unauthorized access.
          </li>
          <li>
            If you notice any suspicious activity, change your password
            immediately.
          </li>
          <li>Use two-factor authentication for added security.</li>
          <li>Don't share your login credentials with others.</li>
        </ul>
      </div>
    </div>;
};
export default LoginHistoryTool;