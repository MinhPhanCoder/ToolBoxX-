import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, SettingsIcon, TrendingUpIcon, TicketIcon, ClockIcon, MessageSquareIcon, ShieldIcon, XIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const Sidebar = ({
  isOpen,
  setIsOpen
}: SidebarProps) => {
  const {
    isAdmin
  } = useAuth();
  const {
    t
  } = useLanguage();
  const navItems = [{
    name: t('dashboard'),
    path: '/dashboard',
    icon: <HomeIcon size={20} />
  }, {
    name: t('goldTracker'),
    path: '/tools/gold-tracker',
    icon: <TrendingUpIcon size={20} />
  }, {
    name: t('lotteryResults'),
    path: '/tools/lottery-results',
    icon: <TicketIcon size={20} />
  }, {
    name: t('loginHistory'),
    path: '/tools/login-history',
    icon: <ClockIcon size={20} />
  }, {
    name: t('chatGPT'),
    path: '/tools/chat-gpt',
    icon: <MessageSquareIcon size={20} />
  }, {
    name: t('settings'),
    path: '/settings',
    icon: <SettingsIcon size={20} />
  }];
  if (isAdmin) {
    navItems.push({
      name: t('adminPanel'),
      path: '/admin',
      icon: <ShieldIcon size={20} />
    });
  }
  return <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden" onClick={() => setIsOpen(false)}></div>}
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">UD</span>
              </div>
              <h2 className="ml-2 text-lg font-semibold text-gray-900">
                Utilities Dashboard
              </h2>
            </div>
            <button className="md:hidden p-1 rounded-md text-gray-500 hover:text-gray-900" onClick={() => setIsOpen(false)}>
              <XIcon size={20} />
            </button>
          </div>
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map(item => <li key={item.path}>
                  <NavLink to={item.path} className={({
                isActive
              }) => `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsOpen(false)}>
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>)}
            </ul>
          </nav>
        </div>
      </aside>
    </>;
};
export default Sidebar;