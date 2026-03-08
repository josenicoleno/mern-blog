import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({ language: 'es', setLanguage: () => {} });

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // try to load saved language, otherwise use browser preference (es by default)
  const getInitialLang = () => {
    const saved = localStorage.getItem('lang');
    if (saved) return saved;
    const nav = navigator.language || navigator.userLanguage || '';
    if (nav.startsWith('en')) return 'en';
    if (nav.startsWith('it')) return 'it';
    // default to spanish
    return 'es';
  };

  const [language, setLanguageState] = useState(getInitialLang);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};