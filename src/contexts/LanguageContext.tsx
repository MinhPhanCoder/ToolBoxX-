import React, { useEffect, useState, createContext, useContext } from 'react';
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}
// Simple translations
const translations: Translations = {
  en: {
    dashboard: 'Dashboard',
    settings: 'Settings',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    goldPrice: 'Gold Price',
    lotteryResults: 'Lottery Results',
    loginHistory: 'Login History',
    chatGPT: 'Chat with GPT',
    forms: 'Forms',
    language: 'Language',
    theme: 'Theme',
    profile: 'Profile',
    search: 'Search...',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    submit: 'Submit',
    welcome: 'Welcome',
    selectTool: 'Select a tool to get started'
  },
  es: {
    dashboard: 'Panel',
    settings: 'Ajustes',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    register: 'Registrarse',
    goldPrice: 'Precio del Oro',
    lotteryResults: 'Resultados de Lotería',
    loginHistory: 'Historial de Sesiones',
    chatGPT: 'Chat con GPT',
    forms: 'Formularios',
    language: 'Idioma',
    theme: 'Tema',
    profile: 'Perfil',
    search: 'Buscar...',
    email: 'Correo electrónico',
    password: 'Contraseña',
    name: 'Nombre',
    submit: 'Enviar',
    welcome: 'Bienvenido',
    selectTool: 'Seleccione una herramienta para comenzar'
  },
  fr: {
    dashboard: 'Tableau de bord',
    settings: 'Paramètres',
    login: 'Connexion',
    logout: 'Déconnexion',
    register: "S'inscrire",
    goldPrice: "Prix de l'Or",
    lotteryResults: 'Résultats de Loterie',
    loginHistory: 'Historique de Connexion',
    chatGPT: 'Chat avec GPT',
    forms: 'Formulaires',
    language: 'Langue',
    theme: 'Thème',
    profile: 'Profil',
    search: 'Rechercher...',
    email: 'E-mail',
    password: 'Mot de passe',
    name: 'Nom',
    submit: 'Soumettre',
    welcome: 'Bienvenue',
    selectTool: 'Sélectionnez un outil pour commencer'
  }
};
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  availableLanguages: string[];
}
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
  const [language, setLanguageState] = useState('en');
  const availableLanguages = Object.keys(translations);
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && availableLanguages.includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };
  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };
  return <LanguageContext.Provider value={{
    language,
    setLanguage,
    t,
    availableLanguages
  }}>
      {children}
    </LanguageContext.Provider>;
};