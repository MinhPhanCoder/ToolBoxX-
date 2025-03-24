import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { HomeIcon, SettingsIcon, CoinsIcon, TicketIcon, ClockIcon, MessageCircleIcon, FileTextIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, XIcon } from 'lucide-react';
import Input from '../ui/Input';
interface SidebarItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}
interface SidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen = false,
  onClose
}) => {
  const {
    t
  } = useLanguage();
  const {
    user
  } = useAuth();
  const {
    theme
  } = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const sidebarItems: SidebarItem[] = [{
    name: t('dashboard'),
    path: '/dashboard',
    icon: <HomeIcon size={20} />
  }, {
    name: t('goldPrice'),
    path: '/dashboard/gold-price',
    icon: <CoinsIcon size={20} />
  }, {
    name: t('lotteryResults'),
    path: '/dashboard/lottery',
    icon: <TicketIcon size={20} />
  }, {
    name: t('loginHistory'),
    path: '/dashboard/login-history',
    icon: <ClockIcon size={20} />
  }, {
    name: t('chatGPT'),
    path: '/dashboard/chat',
    icon: <MessageCircleIcon size={20} />
  }, {
    name: t('forms'),
    path: '/dashboard/forms',
    icon: <FileTextIcon size={20} />
  }, {
    name: t('settings'),
    path: '/settings',
    icon: <SettingsIcon size={20} />
  }];
  const filteredItems = sidebarItems.filter(item => (item.adminOnly ? user?.role === 'admin' : true) && item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const sidebarClasses = `
    bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
    flex flex-col h-full transition-all duration-300
    ${collapsed ? 'w-16' : 'w-64'}
  `;
  const mobileClasses = `
    fixed inset-y-0 left-0 z-40 
    transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    md:relative md:translate-x-0
  `;
  return <>
      {isMobileOpen && <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 md:hidden" onClick={onClose} />}
      <div className={`${sidebarClasses} ${mobileClasses}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {!collapsed && <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
              Utility Hub
            </h1>}
          <div className="flex items-center">
            {isMobileOpen && <button onClick={onClose} className="md:hidden p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                <XIcon size={20} />
              </button>}
            <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
              {collapsed ? <ChevronRightIcon size={20} /> : <ChevronLeftIcon size={20} />}
            </button>
          </div>
        </div>
        {!collapsed && <div className="px-4 py-2">
            <Input placeholder={t('search')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} leftIcon={<SearchIcon size={16} className="text-gray-400 dark:text-gray-500" />} fullWidth className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" />
          </div>}
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="space-y-1 px-2">
            {filteredItems.map(item => {
            const isActive = location.pathname === item.path;
            return <Link key={item.path} to={item.path} className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}
                    ${collapsed ? 'justify-center' : ''}
                  `}>
                  <div className={`${isActive ? 'text-primary-700 dark:text-primary-100' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white'}`}>
                    {item.icon}
                  </div>
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>;
          })}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {!collapsed && <div className="flex flex-col space-y-1">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                v1.0.0
              </div>
            </div>}
        </div>
      </div>
    </>;
};
export default Sidebar;