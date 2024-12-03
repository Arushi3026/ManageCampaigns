import React, { useState } from "react";
import "../style.css";
import { useLanguage } from "../context/LanguageContext";

const Header = ({ setFilter }) => {
  const { language, translations } = useLanguage();
  const [activeTab, setActiveTab] = useState("upcoming");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFilter(tab);
  };

  return (
    <div className="header">
      <h1>{translations[language].manageCampaigns}</h1>
      <div className="tabs">
        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => handleTabClick("upcoming")}
        >
          {translations[language].upcoming}
        </button>
        <button
          className={activeTab === "live" ? "active" : ""}
          onClick={() => handleTabClick("live")}
        >
          {translations[language].live}
        </button>
        <button
          className={activeTab === "past" ? "active" : ""}
          onClick={() => handleTabClick("past")}
        >
          {translations[language].past}
        </button>
      </div>
    </div>
  );
};

export default Header;
