// LanguageSwitcher.js
import React from 'react';
import { useTranslation } from '../Context/TranslationContext';



const LanguageSwitcher = () => {
  const { switchLanguage, language } = useTranslation();

  const handleChange = (event) => {
    switchLanguage(event.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleChange}>
        <option value="en">English</option>
        <option value="uz">O'zbekcha</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
