import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
export function App() {
  return <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="w-full min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>;
}