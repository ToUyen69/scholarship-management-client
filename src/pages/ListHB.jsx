import React, { useContext } from "react";
import ThanhTopbar from "../components/ThanhTopbar";
import { ScholarshipCard } from "../components/ScholarshipCard";
import Footer from "../components/footer";
// Import kho dữ liệu chung
import { ScholarshipContext } from "../context/ScholarshipContext";
import "./ListHB.css";

export const DesktopListHB = () => {
  // 1. Lấy toàn bộ danh sách học bổng từ Context (Kho lưu trữ chung)
  const { allScholarships } = useContext(ScholarshipContext);

  // 2. Logic: Chỉ hiển thị các học bổng có trạng thái "Open" cho sinh viên
  // (Nếu Admin nhấn "Close Scholarship", học bổng đó sẽ tự động biến mất ở đây)
  const displayList = allScholarships.filter(item => item.status === "Open");

  return (
    <div className="desktop-show-list-hc">
      <ThanhTopbar />

      {/* --- PHẦN BANNER --- */}
      <div className="banner-section">
        <img className="banner-img" alt="Banner" src="/index-bg-1.png" />
      </div>

      {/* --- THANH TÌM KIẾM VÀ LỌC --- */}
      <div className="search-filter-container">
        <div className="search-bar">
          <img className="search-icon" alt="Search" src="/kinhlup.png" />
          <input 
            type="text" 
            placeholder="Looking for scholarship" 
            className="search-input" 
          />
        </div>
        <div className="filter-button">
          <img className="filter-icon" alt="Filter" src="/filter.png" />
        </div>
      </div>

      {/* --- TIÊU ĐỀ LIST OF SCHOLARSHIP --- */}
      <div className="list-title-container">
        <img 
          className="list-title-image" 
          src="/Listofscholarship.png" 
          alt="List of Scholarship" 
        />
      </div>

      {/* --- DANH SÁCH CÁC THẺ HỌC BỔNG --- */}
      <div className="scholarship-list-container">
        {/* Kiểm tra nếu có học bổng thì mới map, không thì hiện thông báo */}
        {displayList.length > 0 ? (
          displayList.map((item) => (
            <ScholarshipCard key={item.id} data={item} />
          ))
        ) : (
          <p style={{ marginTop: "50px", color: "#888", fontWeight: "bold" }}>
            Hiện tại chưa có học bổng nào đang mở.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DesktopListHB;