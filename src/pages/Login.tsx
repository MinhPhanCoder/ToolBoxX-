import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { UserIcon, LockIcon, MailIcon, FacebookIcon, SunIcon, MoonIcon } from 'lucide-react';
import GoogleIcon from '../components/ui/GoogleIcon';
const Login: React.FC = () => {
  const {
    login,
    register,
    loading,
    error
  } = useAuth();
  const {
    t
  } = useLanguage();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login('email', {
          email,
          password
        });
      } else {
        await register(email, password, name);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      await login(provider);
      navigate('/dashboard');
    } catch (error) {
      console.error(`${provider} login error:`, error);
    }
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="absolute top-4 right-4">
        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none" aria-label="Toggle theme">
          {theme === 'dark' ? <SunIcon size={22} className="text-yellow-300" /> : <MoonIcon size={22} />}
        </button>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
            <UserIcon size={32} className="text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {isLogin ? t('login') : t('register')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 transition-colors duration-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && <Input id="name" label={t('name')} type="text" value={name} onChange={e => setName(e.target.value)} required fullWidth leftIcon={<UserIcon size={18} className="text-gray-400 dark:text-gray-500" />} />}
            <Input id="email" label={t('email')} type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth leftIcon={<MailIcon size={18} className="text-gray-400 dark:text-gray-500" />} />
            <Input id="password" label={t('password')} type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth leftIcon={<LockIcon size={18} className="text-gray-400 dark:text-gray-500" />} />
            {error && <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                <div className="text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              </div>}
            <div>
              <Button type="submit" fullWidth isLoading={loading}>
                {isLogin ? t('login') : t('register')}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  {t('login')} {t('with')}
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => handleSocialLogin('facebook')} leftIcon={<FacebookIcon size={18} className="text-blue-600" />}>
                Facebook
              </Button>
              <Button variant="outline" onClick={() => handleSocialLogin('google')} leftIcon={<GoogleIcon size={18} className="text-red-500" />}>
                Google
              </Button>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button type="button" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? t('register') : t('login')}
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default Login;