import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (provider: 'google' | 'facebook' | 'email', credentials?: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Simulate authentication check on mount
  useEffect(() => {
    // In a real app, this would check for an existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  // Mock login function
  const login = async (provider: 'google' | 'facebook' | 'email', credentials?: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock user data - in a real app this would come from your auth provider
      const mockUser: User = {
        id: '123',
        name: provider === 'email' ? 'John Doe' : 'Social User',
        email: credentials?.email || 'user@example.com',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };
  // Mock logout function
  const logout = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      localStorage.removeItem('user');
    } catch (err: any) {
      setError(err.message || 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };
  // Mock register function
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock user data - in a real app this would come from your auth provider
      const mockUser: User = {
        id: '123',
        name,
        email,
        role: 'user'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };
  return <AuthContext.Provider value={{
    user,
    loading,
    error,
    login,
    logout,
    register
  }}>
      {children}
    </AuthContext.Provider>;
};