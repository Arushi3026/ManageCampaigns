// LanguageContext.js
import React, { createContext, useState, useContext } from 'react';
// import data from "../data.json";

// Create a Context for language
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Translation data for English and Hindi
const translations = {
  en: {
    manageCampaigns: 'Manage Campaigns',
    upcoming: 'Upcoming Campaigns',
    live: 'Live Campaigns',
    past: 'Past Campaigns',
    viewPricing: 'View Pricing',
    csv: 'CSV',
    report: 'Report',
    scheduleAgain: 'Schedule Again',
    campaign: 'Campaign',
    actions: 'Actions',
    date: 'Date',
  },
  hi: {
    manageCampaigns: 'अभियानों का प्रबंधन करें',
    upcoming: 'आगामी अभियान',
    live: 'सजीव अभियान',
    past: 'भूतकाल अभियान',
    viewPricing: 'मूल्य देखें',
    csv: 'CSV',
    report: 'रिपोर्ट',
    scheduleAgain: 'फिर से अनुसूची',
    campaign: 'अभियान',
    actions: 'क्रियाएँ',
    date: 'तिथि',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};
