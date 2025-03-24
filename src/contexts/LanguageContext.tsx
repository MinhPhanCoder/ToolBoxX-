import React, { useEffect, useState, createContext, useContext } from 'react';
interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
  t: (key: string) => string;
}
// Simple translations for demonstration
const translations: Record<string, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    settings: 'Settings',
    goldTracker: 'Gold Price Tracker',
    lotteryResults: 'Lottery Results',
    loginHistory: 'Login History',
    chatGPT: 'Chat with GPT',
    adminPanel: 'Admin Panel',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    search: 'Search',
    welcome: 'Welcome to the Toolify',
    language: 'Language',
    theme: 'Theme',
    notifications: 'Notifications',
    profile: 'Profile'
    // Add more translations as needed
  },
  es: {
    dashboard: 'Panel Principal',
    settings: 'Configuración',
    goldTracker: 'Seguimiento de Oro',
    lotteryResults: 'Resultados de Lotería',
    loginHistory: 'Historial de Inicio de Sesión',
    chatGPT: 'Chat con GPT',
    adminPanel: 'Panel de Administrador',
    logout: 'Cerrar Sesión',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    name: 'Nombre',
    search: 'Buscar',
    welcome: 'Bienvenido al Panel de Utilidades',
    language: 'Idioma',
    theme: 'Tema',
    notifications: 'Notificaciones',
    profile: 'Perfil'
    // Add more translations as needed
  },
  fr: {
    dashboard: 'Tableau de Bord',
    settings: 'Paramètres',
    goldTracker: "Suivi de l'Or",
    lotteryResults: 'Résultats de Loterie',
    loginHistory: 'Historique de Connexion',
    chatGPT: 'Discuter avec GPT',
    adminPanel: "Panneau d'Administration",
    logout: 'Déconnexion',
    login: 'Connexion',
    register: "S'inscrire",
    email: 'Email',
    password: 'Mot de Passe',
    name: 'Nom',
    search: 'Rechercher',
    welcome: 'Bienvenue sur le Tableau de Bord des Utilitaires',
    language: 'Langue',
    theme: 'Thème',
    notifications: 'Notifications',
    profile: 'Profil'
    // Add more translations as needed
  }
};
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  const changeLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };
  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };
  const value = {
    language,
    changeLanguage,
    t
  };
  return <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>;
};