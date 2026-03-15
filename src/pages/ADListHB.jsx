import React, { useContext } from "react";
import AdminTopbar from "../components/AdminTopbar"; // Quan trọng: Gọi đúng Topbar Admin
import { ScholarshipCard } from "../components/ScholarshipCard";
import Footer from "../components/footer";
import { scholarshipScholarships } from "../data/scholarshipData";
import "./ListHB.css"; // Admin và Student dùng chung layout danh sách
import { ScholarshipContext } from "../context/ScholarshipContext"; 
import "./ListHB.css";

export const DesktopADListHB = () => {
  const { allScholarships } = useContext(ScholarshipContext);

  return (
    <div className="desktop-show-list-hc">
      <AdminTopbar />

      <div className="banner-section">
        <img className="banner-img" alt="Banner" src="/index-bg-1.png" />
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <img className="search-icon" alt="Search" src="/kinhlup.png" />
          <input type="text" placeholder="Looking for scholarship (Admin Mode)" className="search-input" />
        </div>
        <div className="filter-button">
          <img className="filter-icon" alt="Filter" src="/filter.png" />
        </div>
      </div>

      <div className="list-title-container">
        <img 
          className="list-title-image" 
          src="/Listofscholarship.png" 
          alt="List of Scholarship" 
        />
      </div>

      <div className="scholarship-list-container">
        {scholarshipScholarships.map((item) => (
          <ScholarshipCard key={item.id} data={item} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default DesktopADListHB;