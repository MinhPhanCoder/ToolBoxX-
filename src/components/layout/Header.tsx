import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { UserIcon, BellIcon, LogOutIcon, GlobeIcon, SunIcon, MoonIcon, MenuIcon, SearchIcon } from 'lucide-react';
import Button from '../ui/Button';
const Header: React.FC<{
  toggleMobileSidebar?: () => void;
}> = ({
  toggleMobileSidebar
}) => {
  const {
    user,
    logout
  } = useAuth();
  const {
    t,
    language,
    setLanguage,
    availableLanguages
  } = useLanguage();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  return <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors duration-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center md:hidden">
            <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" onClick={toggleMobileSidebar}>
              <span className="sr-only">Open sidebar</span>
              <MenuIcon size={24} aria-hidden="true" />
            </button>
          </div>
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Utility Dashboard
            </h1>
            <div className="hidden md:ml-10 md:flex space-x-4">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800">
                <SearchIcon size={20} />
              </button>
              {searchOpen && <div className="relative">
                  <input type="text" placeholder={t('search')} className="w-64 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500 text-sm" autoFocus />
                </div>}
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            {/* Theme Toggle */}
            <div>
              <button onClick={toggleTheme} className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800" aria-label="Toggle theme">
                {theme === 'dark' ? <SunIcon size={22} className="text-yellow-300" /> : <MoonIcon size={22} />}
              </button>
            </div>
            {/* Notifications */}
            <div className="relative">
              <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800">
                <span className="sr-only">View notifications</span>
                <BellIcon size={22} />
              </button>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
            </div>
            {/* Language Selector */}
            <div className="relative">
              <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800" onClick={() => setLangMenuOpen(!langMenuOpen)}>
                <span className="sr-only">Change language</span>
                <div className="flex items-center">
                  <GlobeIcon size={22} />
                  <span className="ml-1 text-sm font-medium hidden sm:inline">
                    {language.toUpperCase()}
                  </span>
                </div>
              </button>
              {langMenuOpen && <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none py-1 z-20">
                  {availableLanguages.map(lang => <button key={lang} onClick={() => {
                setLanguage(lang);
                setLangMenuOpen(false);
              }} className={`block w-full text-left px-4 py-2 text-sm ${language === lang ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      {lang.toUpperCase()}
                    </button>)}
                </div>}
            </div>
            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <span className="sr-only">Open user menu</span>
                {user?.avatar ? <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" /> : <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <UserIcon size={16} className="text-gray-500 dark:text-gray-400" />
                  </div>}
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                  {user?.name}
                </span>
              </button>
              {userMenuOpen && <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none py-1 z-20">
                  <div className="px-4 py-2 text-sm text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </div>
                    <div className="text-xs mt-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 px-2 py-0.5 rounded-full inline-block">
                      {user?.role}
                    </div>
                  </div>
                  <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <LogOutIcon size={16} className="mr-2" />
                    {t('logout')}
                  </button>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;