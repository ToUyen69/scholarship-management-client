import React, { useState, useContext } from "react";
import ThanhTopbar from "../components/ThanhTopbar";
import { ScholarshipCard } from "../components/ScholarshipCard";
import Footer from "../components/footer";
// Import dữ liệu và danh mục từ file data
import { scholarshipCategories } from "../data/scholarshipData";
import { ScholarshipContext } from "../context/ScholarshipContext";
import "./AllHB.css";

export const AllHB = () => {
  // 1. Lấy dữ liệu từ Context
  const { allScholarships } = useContext(ScholarshipContext);
  const [selectedCategory, setSelectedCategory] = useState("tat_ca");

  // 2. Logic lọc danh sách học bổng (Chỉ hiện cái Open cho sinh viên)
  const filteredScholarships = allScholarships
    .filter((s) => s.status === "Open")
    .filter((item) => {
      if (selectedCategory === "tat_ca") return true;
      return item.category === selectedCategory;
    });

  return (
    <div className="desktop-show-list-hc">
      <ThanhTopbar />

      <main className="main-content-all">
        {/* 1. THANH TÌM KIẾM VÀ LỌC */}
        <div className="search-filter-section">
          <div className="search-bar">
            <div className="search-icon-box">
              <img src="/kinhlup.png" alt="Search" className="search-icon" />
            </div>
            <input 
              type="text" 
              placeholder="Looking for scholarship" 
              className="search-input" 
            />
          </div>
          <div className="filter-button">
            <img src="/filter.png" alt="Filter" className="filter-icon" />
          </div>
        </div>

        {/* 2. THANH DANH MỤC */}
        <div className="category-container">
          <div className="category-navbar">
            {scholarshipCategories.map((cat) => (
              <div
                key={cat.id}
                className={`category-item ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
                {/* Chỉ hiện đường line dưới mục đang được chọn */}
                {selectedCategory === cat.id && <div className="line-active"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* 3. TIÊU ĐỀ (Màu cam) */}
        <div className="list-title-container">
          <h2 className="scholarship-heading">SCHOLARSHIP</h2>
        </div>

        {/* 4. DANH SÁCH HỌC BỔNG ĐÃ LỌC */}
        <div className="scholarship-list-container">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map((item) => (
              <ScholarshipCard key={item.id} data={item} />
            ))
          ) : (
            <p className="no-data">Hiện không có học bổng nào trong mục này.</p>
          )}
        </div>

        {/* 5. PHÂN TRANG (Đã đưa vào trong return) */}
        <div className="pagination">
          <span>&lt; 1 2 3 4 5 ... &gt;</span>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllHB;