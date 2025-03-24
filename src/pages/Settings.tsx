import React, { useState } from 'react';
import { GlobeIcon, MoonIcon, BellIcon, UserIcon, ShieldIcon, CheckIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
const Settings = () => {
  const {
    language,
    changeLanguage,
    t
  } = useLanguage();
  const {
    currentUser,
    isAdmin
  } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true
  });
  const [darkMode, setDarkMode] = useState(false);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value);
  };
  const tabs = [{
    id: 'general',
    name: 'General',
    icon: <GlobeIcon size={18} />
  }, {
    id: 'notifications',
    name: 'Notifications',
    icon: <BellIcon size={18} />
  }, {
    id: 'profile',
    name: 'Profile',
    icon: <UserIcon size={18} />
  }];
  if (isAdmin) {
    tabs.push({
      id: 'admin',
      name: 'Admin Settings',
      icon: <ShieldIcon size={18} />
    });
  }
  return <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('settings')}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Tabs */}
        <div className="w-full md:w-64 mb-6 md:mb-0">
          <nav className="space-y-1">
            {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${activeTab === tab.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                <span className="mr-3">{tab.icon}</span>
                {tab.name}
              </button>)}
          </nav>
        </div>
        {/* Content */}
        <div className="flex-1 md:ml-6 bg-white p-6 rounded-lg shadow-sm">
          {activeTab === 'general' && <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                General Settings
              </h2>
              {/* Language Selection */}
              <div className="mb-6">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('language')}
                </label>
                <select id="language" name="language" value={language} onChange={handleLanguageChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              {/* Theme Toggle */}
              <div className="mb-6">
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('theme')}
                </label>
                <button onClick={() => setDarkMode(!darkMode)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}>
                  <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  <MoonIcon size={14} className={`absolute right-1.5 ${darkMode ? 'text-white' : 'text-gray-400'}`} />
                </button>
                <p className="mt-1 text-sm text-gray-500">
                  {darkMode ? 'Dark mode enabled' : 'Light mode enabled'}
                </p>
              </div>
            </div>}
          {activeTab === 'notifications' && <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <button onClick={() => setNotifications({
                ...notifications,
                emailNotifications: !notifications.emailNotifications
              })} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${notifications.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                {/* Push Notifications */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Push Notifications
                    </h3>
                    <p className="text-sm text-gray-500">
                      Receive notifications on your device
                    </p>
                  </div>
                  <button onClick={() => setNotifications({
                ...notifications,
                pushNotifications: !notifications.pushNotifications
              })} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${notifications.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                {/* Weekly Digest */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Weekly Digest
                    </h3>
                    <p className="text-sm text-gray-500">
                      Receive a weekly summary of activity
                    </p>
                  </div>
                  <button onClick={() => setNotifications({
                ...notifications,
                weeklyDigest: !notifications.weeklyDigest
              })} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${notifications.weeklyDigest ? 'bg-blue-600' : 'bg-gray-200'}`}>
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${notifications.weeklyDigest ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>}
          {activeTab === 'profile' && <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Profile Settings
              </h2>
              <div className="flex items-center mb-6">
                {currentUser?.avatar ? <img src={currentUser.avatar} alt={currentUser.name} className="h-16 w-16 rounded-full object-cover" /> : <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon size={24} className="text-gray-500" />
                  </div>}
                <div className="ml-4">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                    Change Avatar
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input type="text" id="name" defaultValue={currentUser?.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input type="email" id="email" defaultValue={currentUser?.email} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>}
          {activeTab === 'admin' && isAdmin && <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Admin Settings
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ShieldIcon size={20} className="text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      These settings are only available to administrators.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    System Parameters
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <span className="text-sm text-gray-700">
                        API Request Limit
                      </span>
                      <span className="text-sm font-medium">1000 / day</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <span className="text-sm text-gray-700">
                        Max User Storage
                      </span>
                      <span className="text-sm font-medium">5 GB</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <span className="text-sm text-gray-700">
                        Session Timeout
                      </span>
                      <span className="text-sm font-medium">30 minutes</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    User Management
                  </h3>
                  <button className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 mr-2">
                    Manage Users
                  </button>
                  <button className="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300">
                    View Audit Logs
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    System Maintenance
                  </h3>
                  <button className="px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700">
                    Clear Cache
                  </button>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default Settings;