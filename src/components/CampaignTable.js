import React, { useState, useEffect } from "react";
import "../style.css";
import viewIcon from "../assets/view-icon.png";
import csvIcon from "../assets/csv-icon.png";
import reportIcon from "../assets/report-icon.png";
import calendarIcon from "../assets/calendar-icon.png";
import { useLanguage } from "../context/LanguageContext";

const CampaignTable = ({ data, filter }) => {
  const [campaigns, setCampaigns] = useState(data);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [pricingModalData, setPricingModalData] = useState(null);
  const { language, translations } = useLanguage();

  useEffect(() => {
    // Update campaign data when the language changes
    const updatedCampaigns = data.map((campaign) => ({
      ...campaign,
      name: campaign.name[language], // Select name based on selected language
      price: campaign.price[language], // Select price based on selected language
    }));
    setCampaigns(updatedCampaigns);
  }, [language, data]); // Re-run when language changes

  //function to normalize dates to midnight
  const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0); // Reset to midnight
    return normalized;
  };

  // Filter campaigns based on the current filter
  const filteredCampaigns = campaigns.filter((campaign) => {
    const now = normalizeDate(Date.now()); 
    const campaignDate = normalizeDate(campaign.createdOn); 

    if (filter === "upcoming") return campaignDate > now;
    if (filter === "live") return campaignDate.getTime() === now.getTime();
    return campaignDate < now;
  });

  const calculateTimeDiff = (date) => {
  
    const now = normalizeDate(Date.now());
    const campaignDate = normalizeDate(date);

    const diff = Math.floor((campaignDate - now) / (1000 * 60 * 60 * 24)); // Days difference
    return diff > 0 ? `${diff} days ahead` : `${-diff} days ago`;
  };

  // Handle new date selection
  const handleDateChange = (newDate) => {
    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) =>
        campaign === selectedCampaign
          ? { ...campaign, createdOn: new Date(newDate).getTime() }
          : campaign
      )
    );
    setSelectedCampaign(null); 
  };

  // Handle opening the pricing modal
  const handleViewPricing = (campaign) => {
    setPricingModalData(campaign);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="campaign-table">
        <thead>
          <tr>
            <th>{translations[language].date}</th>
            <th>{translations[language].campaign}</th>
            <th>{translations[language].viewPricing}</th>
            <th>{translations[language].actions}</th>
          </tr>
        </thead>
        <tbody>
          {filteredCampaigns.map((campaign) => (
            <tr key={campaign.createdOn}>
              <td>
                <div>
                  <div>
                    {new Date(campaign.createdOn)
                      .toDateString()
                      .split(" ")
                      .slice(1)
                      .join(" ")}
                  </div>
                  <div>{calculateTimeDiff(campaign.createdOn)}</div>
                </div>
              </td>
              <td>
                <div className="campaign-name">
                  <img src={campaign.image_url} alt={campaign.name} />
                  <div>
                    <div>{campaign.name}</div>
                    <div>{campaign.region}</div>
                  </div>
                </div>
              </td>
              <td>
                <button
                  className="action-button"
                  onClick={() => handleViewPricing(campaign)}
                >
                  <img src={viewIcon} alt="View" />
                  {translations[language].viewPricing}
                </button>
              </td>
              <td className="actions">
                <a
                  href={campaign.csv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button"
                >
                  <img src={csvIcon} alt="CSV" /> {translations[language].csv}
                </a>
                <a
                  href={campaign.report}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button"
                >
                  <img src={reportIcon} alt="Report" /> {translations[language].report}
                </a>
                <button
                  className="action-button"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <img src={calendarIcon} alt="Schedule Again" />
                  {translations[language].scheduleAgain}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pricing Modal */}
      {pricingModalData && (
        <div className="modal">
          <div className="modal-content">
            <h3>{pricingModalData.name} - {translations[language].viewPricing}</h3>
            <p>{pricingModalData.price}</p>
            <button onClick={() => setPricingModalData(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {selectedCampaign && (
        <div className="modal">
          <div className="modal-content">
            <h3>{translations[language].scheduleAgain}</h3>
            <input
              type="date"
              onChange={(e) => handleDateChange(new Date(e.target.value))}
            />
            <button onClick={() => setSelectedCampaign(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignTable;
