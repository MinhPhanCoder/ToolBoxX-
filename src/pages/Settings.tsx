import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { UserIcon, MailIcon, ShieldIcon, SunIcon, MoonIcon, MonitorIcon } from 'lucide-react';
const Settings: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    availableLanguages
  } = useLanguage();
  const {
    theme,
    setTheme
  } = useTheme();
  const {
    user
  } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    alert('Profile updated successfully');
  };
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  return <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar isMobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleMobileSidebar={toggleMobileSidebar} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg transition-colors duration-200">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t('settings')}
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Manage your account settings and preferences.
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                  <button className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'profile' ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('profile')}>
                    {t('profile')}
                  </button>
                  <button className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'language' ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('language')}>
                    {t('language')}
                  </button>
                  <button className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'appearance' ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('appearance')}>
                    Appearance
                  </button>
                  {user?.role === 'admin' && <button className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'admin' ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('admin')}>
                      Admin
                    </button>}
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                  {activeTab === 'profile' && <form onSubmit={handleSaveProfile} className="space-y-6 max-w-lg">
                      <div className="flex justify-center">
                        <div className="relative">
                          {user?.avatar ? <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" /> : <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <UserIcon size={36} className="text-gray-500 dark:text-gray-400" />
                            </div>}
                          <button type="button" className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1 border border-gray-300 dark:border-gray-600 shadow-sm">
                            <span className="sr-only">Change avatar</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <Input id="name" label={t('name')} type="text" value={name} onChange={e => setName(e.target.value)} required fullWidth leftIcon={<UserIcon size={18} className="text-gray-400 dark:text-gray-500" />} />
                      <Input id="email" label={t('email')} type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth leftIcon={<MailIcon size={18} className="text-gray-400 dark:text-gray-500" />} />
                      <div className="flex justify-end">
                        <Button type="submit">{t('submit')}</Button>
                      </div>
                    </form>}
                  {activeTab === 'language' && <div className="max-w-lg">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('language')}
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {availableLanguages.map(lang => <button key={lang} type="button" onClick={() => setLanguage(lang)} className={`
                                flex items-center justify-center px-3 py-2 border rounded-md text-sm font-medium transition-colors
                                ${language === lang ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}
                              `}>
                              {lang.toUpperCase()}
                            </button>)}
                        </div>
                      </div>
                    </div>}
                  {activeTab === 'appearance' && <div className="max-w-lg">
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Theme
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <button type="button" onClick={() => setTheme('light')} className={`
                              flex flex-col items-center justify-center px-3 py-3 border rounded-md transition-colors
                              ${theme === 'light' ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}
                            `}>
                            <SunIcon size={24} className="mb-2" />
                            <span className="text-sm font-medium">Light</span>
                          </button>
                          <button type="button" onClick={() => setTheme('dark')} className={`
                              flex flex-col items-center justify-center px-3 py-3 border rounded-md transition-colors
                              ${theme === 'dark' ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}
                            `}>
                            <MoonIcon size={24} className="mb-2" />
                            <span className="text-sm font-medium">Dark</span>
                          </button>
                          <button type="button" onClick={() => {
                        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                          setTheme('dark');
                        } else {
                          setTheme('light');
                        }
                      }} className={`
                              flex flex-col items-center justify-center px-3 py-3 border rounded-md transition-colors
                              ${theme !== 'light' && theme !== 'dark' ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-300 dark:border-primary-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}
                            `}>
                            <MonitorIcon size={24} className="mb-2" />
                            <span className="text-sm font-medium">System</span>
                          </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Choose how Utility Dashboard appears to you. Select a
                          single theme, or sync with your system.
                        </p>
                      </div>
                    </div>}
                  {activeTab === 'admin' && user?.role === 'admin' && <div className="max-w-lg">
                      <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <ShieldIcon className="h-5 w-5 text-yellow-400 dark:text-yellow-300" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                              Admin Area
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                              <p>
                                This section is only visible to administrators.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            System Parameters
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Configure global system settings that affect all
                            users.
                          </p>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                            API Configuration
                          </h4>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Input id="api-key" label="API Key" type="password" defaultValue="••••••••••••••••" fullWidth />
                              <Input id="api-url" label="API URL" type="text" defaultValue="https://api.example.com/v1" fullWidth />
                            </div>
                            <div className="flex justify-end">
                              <Button variant="primary">
                                Save API Settings
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                            User Management
                          </h4>
                          <Button variant="outline">Manage Users</Button>
                        </div>
                      </div>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>;
};
export default Settings;