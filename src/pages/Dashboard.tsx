import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useLanguage } from '../contexts/LanguageContext';
import GoldPriceTool from '../components/tools/GoldPriceTool';
import LotteryResultsTool from '../components/tools/LotteryResultsTool';
import LoginHistoryTool from '../components/tools/LoginHistoryTool';
import ChatGPTTool from '../components/tools/ChatGPTTool';
import FormsTool from '../components/tools/FormsTool';
import DataTableTool from '../components/tools/DataTableTool';
import StatCard from '../components/data/StatCard';
import ToolCard from '../components/data/ToolCard';
import SearchBar from '../components/data/SearchBar';
import Breadcrumb from '../components/navigation/Breadcrumb';
import { TrendingUpIcon, UsersIcon, ActivityIcon, LayersIcon, CoinsIcon, TicketIcon, ClockIcon, MessageCircleIcon, FileTextIcon, DatabaseIcon } from 'lucide-react';
const Dashboard: React.FC = () => {
  const {
    t
  } = useLanguage();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const getBreadcrumbItems = () => {
    const path = location.pathname.split('/').filter(Boolean);
    if (path.length <= 1) return [];
    return path.slice(1).map(item => ({
      label: t(item.replace(/-/g, '')),
      href: `/${path.slice(0, path.indexOf(item) + 1).join('/')}`
    }));
  };
  const tools = [{
    name: t('goldPrice'),
    path: '/dashboard/gold-price',
    icon: <CoinsIcon size={24} className="text-white" />,
    description: 'Track real-time gold prices and historical trends',
    gradient: 'from-yellow-400 to-yellow-600',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
    stats: [{
      label: 'Price Updates',
      value: '24/7'
    }, {
      label: 'Markets',
      value: '150+'
    }]
  }, {
    name: t('lotteryResults'),
    path: '/dashboard/lottery',
    icon: <TicketIcon size={24} className="text-white" />,
    description: 'Check latest lottery results and winning numbers',
    gradient: 'from-green-400 to-green-600',
    image: 'https://images.unsplash.com/photo-1518133683791-0b9de5a055f0?auto=format&fit=crop&w=800&q=80',
    stats: [{
      label: 'Daily Winners',
      value: '125'
    }, {
      label: 'Total Jackpot',
      value: '$2.5M'
    }]
  }, {
    name: t('loginHistory'),
    path: '/dashboard/login-history',
    icon: <ClockIcon size={24} className="text-white" />,
    description: 'View login history and activity',
    gradient: 'from-blue-400 to-blue-600',
    image: 'https://images.unsplash.com/photo-1518133683791-0b9de5a055f0?auto=format&fit=crop&w=800&q=80',
    stats: [{
      label: 'Logins',
      value: '1,234'
    }, {
      label: 'Activity',
      value: '567'
    }]
  }, {
    name: t('chatGPT'),
    path: '/dashboard/chat',
    icon: <MessageCircleIcon size={24} className="text-white" />,
    description: 'Interact with ChatGPT for assistance',
    gradient: 'from-purple-400 to-purple-600',
    image: 'https://images.unsplash.com/photo-1518133683791-0b9de5a055f0?auto=format&fit=crop&w=800&q=80',
    stats: [{
      label: 'Conversations',
      value: '1,234'
    }, {
      label: 'Responses',
      value: '567'
    }]
  }, {
    name: t('forms'),
    path: '/dashboard/forms',
    icon: <FileTextIcon size={24} className="text-white" />,
    description: 'Create and manage forms',
    gradient: 'from-pink-400 to-pink-600',
    image: 'https://images.unsplash.com/photo-1518133683791-0b9de5a055f0?auto=format&fit=crop&w=800&q=80',
    stats: [{
      label: 'Forms Created',
      value: '123'
    }, {
      label: 'Responses',
      value: '456'
    }]
  }, {
    name: t('dataTable'),
    path: '/dashboard/data-table',
    icon: <DatabaseIcon size={24} className="text-white" />,
    description: 'View and manage data tables',
    gradient: 'from-green-400 to-green-600',
    image: 'https://images.unsplash.com/photo-1518133683791-0b9de5a055f0?auto=format&fit=crop&w=800&q=80',
    stats: [{
      label: 'Rows',
      value: '1,234'
    }, {
      label: 'Columns',
      value: '567'
    }]
  }];
  const renderWelcome = () => <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Users" value="2,420" icon={<UsersIcon size={20} className="text-primary-500" />} change={{
        value: 12,
        type: 'increase'
      }} />
        <StatCard title="Total Revenue" value="$12,450" icon={<TrendingUpIcon size={20} className="text-green-500" />} change={{
        value: 8.2,
        type: 'increase'
      }} />
        <StatCard title="Activity Rate" value="85%" icon={<ActivityIcon size={20} className="text-blue-500" />} change={{
        value: 5.1,
        type: 'decrease'
      }} />
        <StatCard title="Total Tools" value="12" icon={<LayersIcon size={20} className="text-purple-500" />} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => <ToolCard key={tool.path} title={tool.name} description={tool.description} icon={tool.icon} image={tool.image} path={tool.path} gradient={tool.gradient} stats={tool.stats} />)}
      </div>
    </div>;
  return <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar isMobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb items={getBreadcrumbItems()} className="mb-6" />
            <Routes>
              <Route path="/" element={renderWelcome()} />
              <Route path="/gold-price" element={<GoldPriceTool />} />
              <Route path="/lottery" element={<LotteryResultsTool />} />
              <Route path="/login-history" element={<LoginHistoryTool />} />
              <Route path="/chat" element={<ChatGPTTool />} />
              <Route path="/forms" element={<FormsTool />} />
              <Route path="/data-table" element={<DataTableTool />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>;
};
export default Dashboard;