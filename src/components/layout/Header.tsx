import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuIcon, BellIcon, SearchIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
interface HeaderProps {
  toggleSidebar: () => void;
}
const Header = ({
  toggleSidebar
}: HeaderProps) => {
  const {
    currentUser,
    logout
  } = useAuth();
  const {
    t
  } = useLanguage();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  return <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none">
            <MenuIcon size={24} />
          </button>
          <div className="hidden md:flex ml-4 md:ml-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon size={18} className="text-gray-400" />
              </div>
              <input type="text" placeholder={t('search')} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none">
            <BellIcon size={20} />
          </button>
          <div className="ml-3 relative">
            <div className="flex items-center">
              {currentUser?.avatar ? <img className="h-8 w-8 rounded-full object-cover" src={currentUser.avatar} alt={currentUser.name} /> : <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <UserIcon size={16} className="text-gray-600" />
                </div>}
              <div className="hidden md:flex flex-col ml-2">
                <span className="text-sm font-medium text-gray-700">
                  {currentUser?.name}
                </span>
                <span className="text-xs text-gray-500">
                  {currentUser?.role}
                </span>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="ml-4 p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none">
            <LogOutIcon size={20} />
          </button>
        </div>
      </div>
    </header>;
};
export default Header;