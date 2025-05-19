import React, { createContext, useState, useContext, useEffect } from 'react';

// Language constants
export const LANGUAGES = {
  RU: 'ru',
  UZ: 'uz'
};

// Create context
const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({ children }) => {
  // Try to get the language from localStorage or default to Russian
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage ? savedLanguage : LANGUAGES.RU;
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage(language === LANGUAGES.RU ? LANGUAGES.UZ : LANGUAGES.RU);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext; 
