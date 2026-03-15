import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ThanhTopbar from "../components/ThanhTopbar";
import Footer from "../components/footer";
// QUAN TRỌNG: Import ScholarshipContext thay vì dữ liệu từ file scholarshipData
import { ScholarshipContext } from "../context/ScholarshipContext";
import "./DetailHB.css";

const DetailHB = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Lấy toàn bộ danh sách học bổng (bao gồm cả cái Sếp vừa tạo) từ Context
  const { allScholarships } = useContext(ScholarshipContext);

  // 2. Tìm học bổng theo ID trong kho dữ liệu chung
  const hb = allScholarships.find((item) => item.id === id);

  // 3. Nếu không tìm thấy thông tin (trường hợp hi hữu hoặc gõ sai URL)
  if (!hb) {
    return (
      <div className="detail-hb-page">
        <ThanhTopbar />
        <div style={{ padding: "200px", textAlign: "center", color: "#315088" }}>
          <h2>Dữ liệu học bổng đang được cập nhật...</h2>
          <button onClick={() => navigate("/")} style={{ marginTop: "20px", cursor: "pointer" }}>Quay lại</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="detail-hb-page">
      <ThanhTopbar />

      <main className="detail-content">
        {/* --- PHẦN THANH TÌM KIẾM --- */}
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

        {/* --- PHẦN NỘI DUNG CHI TIẾT --- */}
        <div className="detail-container">
          
          {/* CỘT TRÁI: LOGO & NÚT APPLY */}
          <div className="left-column">
            <img src="/detail.png" alt="Details Scholarship" className="detail-text-img" />
            <div className="main-logo-box">
              {/* Ảnh poster học bổng */}
              <img src={hb.image} alt="Logo Học Bổng" className="hb-main-logo" />
            </div>
            <button 
              className="apply-now-btn" 
              onClick={() => navigate(`/apply/${hb.id}`)}
            >
              Apply Now
            </button>
          </div>

          {/* CỘT PHẢI: THÔNG TIN VĂN BẢN */}
          <div className="right-column">
            <h1 className="hb-title-detail">{hb.title}</h1>

            <div className="hb-summary">
              {/* Sử dụng dấu ? để truy cập an toàn vào object details */}
              {hb.details?.quantity && (
                <p><strong>1. Số suất học bổng: </strong>{hb.details.quantity}</p>
              )}
              {hb.details?.value && (
                <p><strong>2. Giá trị học bổng: </strong>{hb.details.value}</p>
              )}
              <p><strong>3. Đối tượng xét học bổng: </strong>{hb.target}</p>
            </div>

            <div className="hb-main-info">
              {/* HIỂN THỊ CHI TIẾT (Linh hoạt cho cả học bổng cũ và mới tạo) */}
              
              {/* Nếu có mảng điều kiện (HB cũ), dùng map để hiện */}
              {hb.details?.conditions && hb.details.conditions.length > 0 && (
                <div className="info-block">
                  <h3>ĐIỀU KIỆN / MÔ TẢ:</h3>
                  <ul>
                    {hb.details.conditions.map((item, index) => (
                      <li key={index}>- {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* QUYỀN LỢI (Nếu có) */}
              {hb.details?.benefits && hb.details.benefits.length > 0 && (
                <div className="info-block">
                  <h3>QUYỀN LỢI:</h3>
                  <ul>
                    {hb.details.benefits.map((item, index) => (
                      <li key={index}>- {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* HỒ SƠ (Nếu có) */}
              {hb.details?.documents && hb.details.documents.length > 0 && (
                <div className="info-block">
                  <h3>HỒ SƠ:</h3>
                  <ul>
                    {hb.details.documents.map((item, index) => (
                      <li key={index}>- {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ghi chú chân trang nếu cần */}
              {(id === "SCH002" || id.startsWith("SCH_")) && (
                <p className="contact-note">
                  Mọi thắc mắc vui lòng liên hệ Phòng Công tác sinh viên để được hỗ trợ!
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetailHB;