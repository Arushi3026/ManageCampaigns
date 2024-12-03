import React, { useState } from "react";
import Header from "./components/Header";
import { LanguageProvider } from './context/LanguageContext';
import CampaignTable from "./components/CampaignTable";
import LanguageSelector from './components/LanguageSelector';
import campaigns from "./data.json";
import "./style.css";

const App = () => {
  const [filter, setFilter] = useState("upcoming");

  return (
    <LanguageProvider>
    <div className="App">
      <LanguageSelector />
      <Header setFilter={setFilter} />
      <CampaignTable data={campaigns.data} filter={filter} />
    </div>
    </LanguageProvider>
  );
};

export default App;
