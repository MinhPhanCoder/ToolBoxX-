import React, { useEffect, useState, createContext, useContext } from 'react';
// Mock user types for demonstration
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  lastLogin?: Date;
}
interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Mock authentication for demonstration
  useEffect(() => {
    // Simulate checking if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in a real app, this would call an authentication API
      const mockUser: User = {
        id: '123',
        name: 'Demo User',
        email: email,
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?u=123',
        lastLogin: new Date()
      };
      setCurrentUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Mock Google login
      const mockUser: User = {
        id: '456',
        name: 'Google User',
        email: 'google@example.com',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?u=456',
        lastLogin: new Date()
      };
      setCurrentUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const loginWithFacebook = async () => {
    setIsLoading(true);
    try {
      // Mock Facebook login
      const mockUser: User = {
        id: '789',
        name: 'Facebook User',
        email: 'facebook@example.com',
        role: 'user',
        avatar: 'https://i.pravatar.cc/150?u=789',
        lastLogin: new Date()
      };
      setCurrentUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Mock registration
      const mockUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: 'user',
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
        lastLogin: new Date()
      };
      setCurrentUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    // Mock logout
    setCurrentUser(null);
    localStorage.removeItem('user');
  };
  const value = {
    currentUser,
    isLoading,
    login,
    loginWithGoogle,
    loginWithFacebook,
    register,
    logout,
    isAdmin: currentUser?.role === 'admin'
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};