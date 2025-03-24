import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUpIcon, TicketIcon, ClockIcon, MessageSquareIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
const Dashboard = () => {
  const {
    currentUser
  } = useAuth();
  const {
    t
  } = useLanguage();
  const tools = [{
    id: 'gold-tracker',
    name: t('goldTracker'),
    description: 'Track gold prices in real-time with historical data and trend analysis.',
    icon: <TrendingUpIcon size={24} className="text-yellow-500" />,
    path: '/tools/gold-tracker',
    color: 'bg-yellow-50 border-yellow-200'
  }, {
    id: 'lottery-results',
    name: t('lotteryResults'),
    description: 'View the latest lottery results and historical winning numbers.',
    icon: <TicketIcon size={24} className="text-green-500" />,
    path: '/tools/lottery-results',
    color: 'bg-green-50 border-green-200'
  }, {
    id: 'login-history',
    name: t('loginHistory'),
    description: 'View your recent login activity and security information.',
    icon: <ClockIcon size={24} className="text-blue-500" />,
    path: '/tools/login-history',
    color: 'bg-blue-50 border-blue-200'
  }, {
    id: 'chat-gpt',
    name: t('chatGPT'),
    description: 'Chat with an AI assistant to get answers to your questions.',
    icon: <MessageSquareIcon size={24} className="text-purple-500" />,
    path: '/tools/chat-gpt',
    color: 'bg-purple-50 border-purple-200'
  }];
  return <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('welcome')}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Hello, {currentUser?.name}! Here are your available tools and
          utilities.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => <Link key={tool.id} to={tool.path} className={`block p-6 border rounded-lg shadow-sm transition-all duration-200 hover:shadow-md ${tool.color}`}>
            <div className="flex items-center mb-4">
              <div className="mr-4 p-2 rounded-full bg-white shadow-sm">
                {tool.icon}
              </div>
              <h2 className="text-lg font-medium text-gray-900">{tool.name}</h2>
            </div>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </Link>)}
      </div>
      {/* Recent Activity Section */}
      <div className="mt-10">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {[...Array(3)].map((_, i) => <div key={i} className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <ClockIcon size={16} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {i === 0 ? 'You logged in from a new device' : i === 1 ? 'You checked gold prices' : 'You viewed lottery results'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {i === 0 ? '2 hours ago' : i === 1 ? 'Yesterday at 3:45 PM' : '3 days ago'}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;