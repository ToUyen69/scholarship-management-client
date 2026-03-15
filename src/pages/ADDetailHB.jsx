import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminTopbar from "../components/AdminTopbar";
import Footer from "../components/footer";
// Import kho dữ liệu chung
import { ScholarshipContext } from "../context/ScholarshipContext";
import "./ADDetailHB.css";

const ADDetailHB = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Lấy dữ liệu và các hàm quản lý từ ScholarshipContext
  const { allScholarships, toggleScholarshipStatus, deleteScholarship } = useContext(ScholarshipContext);

  // Tìm học bổng trong kho dữ liệu chung
  const hb = allScholarships.find((item) => item.id === id);

  if (!hb) return <div style={{padding: "200px", textAlign: "center"}}>Không tìm thấy thông tin học bổng.</div>;

  // Xử lý đóng/mở học bổng
  const handleToggleStatus = () => {
    toggleScholarshipStatus(hb.id);
  };

  // Xử lý xóa học bổng
  const handleDelete = () => {
    if (window.confirm("Sếp có chắc chắn muốn xóa vĩnh viễn học bổng này không?")) {
      deleteScholarship(hb.id);
      navigate("/admin-list"); // Sau khi xóa thành công quay về trang chủ admin
      // Hoặc nếu Sếp đã làm trang DeleteSuccess thì: navigate("/admin/delete-success");
    }
  };

  return (
    <div className="ad-detail-page">
      <AdminTopbar />

      <main className="ad-detail-content">
        {/* --- 1. THANH TÌM KIẾM (ĐỒNG BỘ) --- */}
        <div className="search-filter-section">
          <div className="search-bar">
            <div className="search-icon-box">
              <img className="search-icon" alt="Search" src="/kinhlup.png" />
            </div>
            <input
              type="text"
              placeholder="Looking for scholarship (Admin Mode)"
              className="search-input"
            />
          </div>
          <div className="filter-button">
            <img className="filter-icon" alt="Filter" src="/filter.png" />
          </div>
        </div>

        {/* --- 2. NỘI DUNG CHI TIẾT --- */}
        <div className="detail-container">
          
          {/* CỘT TRÁI: POSTER & CÁC NÚT QUẢN TRỊ */}
          <div className="left-column">
            <img src="/detail.png" alt="Details Scholarship" className="detail-text-img" />
            
            <div className="main-logo-box">
              <img src={hb.image} alt="Logo Học Bổng" className="hb-main-logo" />
            </div>

            {/* NHÓM 5 NÚT CHỨC NĂNG DÀNH RIÊNG CHO ADMIN */}
            <div className="admin-controls">
              <button className="btn-adj" onClick={() => navigate(`/admin/adjust/${hb.id}`)}>
                Adjust Scholarship
              </button>
              
              <button className="btn-view-app" onClick={() => navigate(`/admin/applications/${hb.id}`)}>
                View application
              </button>
              
              <button 
                className={`btn-status ${hb.status === 'Open' ? 'close-type' : 'open-type'}`} 
                onClick={handleToggleStatus}
              >
                {hb.status === "Open" ? "Close Scholarship" : "Open Scholarship"}
              </button>
              
              <button className="btn-del" onClick={handleDelete}>
                Delete Scholarship
              </button>

              <button className="btn-view-rep" onClick={() => navigate(`/admin/report/${hb.id}`)}> 
                View Report
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: THÔNG TIN VĂN BẢN (Copy từ Student) */}
          <div className="right-column">
            <h1 className="hb-title-detail">{hb.title}</h1>
            
            {/* Hiển thị thông báo nếu học bổng đang bị khóa */}
            {hb.status === "Closed" && (
                <div className="status-badge-closed">TRẠNG THÁI: ĐÃ KHÓA (Sinh viên không thấy)</div>
            )}

            <div className="hb-summary">
              {hb.details?.quantity && (
                <p><strong>1. Số suất học bổng: </strong>{hb.details.quantity}</p>
              )}
              {hb.details?.value && (
                <p><strong>2. Giá trị học bổng: </strong>{hb.details.value}</p>
              )}
              <p><strong>3. Đối tượng xét học bổng: </strong>{hb.target}</p>
            </div>

            <div className="hb-main-info">
              {/* ĐIỀU KIỆN */}
              {hb.details?.conditions && (
                <div className="info-block">
                  <h3>ĐIỀU KIỆN:</h3>
                  <ul>
                    {hb.details.conditions.map((item, index) => (
                      <li key={index}>- {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* QUYỀN LỢI */}
              {hb.details?.benefits && (
                <div className="info-block">
                  <h3>QUYỀN LỢI:</h3>
                  <ul>
                    {hb.details.benefits.map((item, index) => (
                      <li key={index}>- {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* HỒ SƠ */}
              {hb.details?.documents && (
                <div className="info-block">
                  <h3>HỒ SƠ:</h3>
                  <ul>
                    {hb.details.documents.map((item, index) => (
                      <li key={index}>- {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {id === "SCH002" && (
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

export default ADDetailHB;