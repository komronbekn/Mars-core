// TranslationContext.js
import React, { createContext, useContext, useState } from 'react';
import { translations } from '../translation';

// Create the context
const TranslationContext = createContext();

// Custom hook to use the Translation Context
export const useTranslation = () => useContext(TranslationContext);

// Translation provider component
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Function to switch languages
  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  // Function to get translation for a key
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ t, switchLanguage, language }}>
      {children}
    </TranslationContext.Provider>
  );
};
