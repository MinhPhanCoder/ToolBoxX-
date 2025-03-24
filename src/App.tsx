import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import GoldTracker from './pages/tools/GoldTracker';
import LotteryResults from './pages/tools/LotteryResults';
import LoginHistory from './pages/tools/LoginHistory';
import ChatGPT from './pages/tools/ChatGPT';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
export function App() {
  return <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                {/* Tool Routes */}
                <Route path="/tools/gold-tracker" element={<GoldTracker />} />
                <Route path="/tools/lottery-results" element={<LotteryResults />} />
                <Route path="/tools/login-history" element={<LoginHistory />} />
                <Route path="/tools/chat-gpt" element={<ChatGPT />} />
                {/* Admin Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminPanel />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>;
}