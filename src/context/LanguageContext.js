import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = {
  UZ: 'uz',
  RU: 'ru',
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(LANGUAGES.UZ);

  const toggleLanguage = () => {
    setLanguage(language === LANGUAGES.RU ? LANGUAGES.UZ : LANGUAGES.RU);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext; 
