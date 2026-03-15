import React, { useContext, useState } from "react";
import { ScholarshipContext } from "../context/ScholarshipContext";
import ThanhTopbar from "../components/ThanhTopbar";
import Footer from "../components/footer";
import "./RegisteredHB.css";

const RegisteredHB = () => {
  // Lấy dữ liệu từ Context (Lưu ý: dùng tên biến khớp với Context của bạn)
  const { appliedScholarships, removeApplication } = useContext(ScholarshipContext);

  // 1. LẤY THÔNG TIN NGƯỜI DÙNG ĐANG ĐĂNG NHẬP
  const userDataString = localStorage.getItem("userLoggedIn");
  const user = userDataString ? JSON.parse(userDataString) : null;

  // Lấy đúng trường 'username' từ file userData.js của bạn (student1, student2...)
  const currentUserName = user ? user.username : null;

  console.log("Đang xem hồ sơ của user:", currentUserName);
  console.log("Tất cả hồ sơ trong máy:", appliedScholarships);

  // --- STATE LỌC (TOGGLES) ---
  const [filterRejected, setFilterRejected] = useState(false);
  const [filterAccepted, setFilterAccepted] = useState(false);
  const [filterChecking, setFilterChecking] = useState(false);

  // --- STATE MENU & MODAL XÓA ---
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // 2. LOGIC LỌC HỒ SƠ THEO USER VÀ THEO TRẠNG THÁI
  const filteredList = appliedScholarships
    // Bước A: Chỉ lấy hồ sơ của sinh viên đang đăng nhập (Sửa lỗi bug 2 account)
    .filter((item) => {
      // Đảm bảo so sánh chính xác tên user
      return String(item.studentUser) === String(currentUserName);
    })
    // Bước B: Lọc theo các nút gạt trạng thái
    .filter((item) => {
      if (!filterRejected && !filterAccepted && !filterChecking) return true;
      if (filterRejected && item.status === "Rejected") return true;
      if (filterAccepted && item.status === "Accepted") return true;
      if (filterChecking && item.status === "Checking") return true;
      return false;
    });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted": return "/Accepted.png";
      case "Rejected": return "/Rejected.png";
      default: return "/Checking.png";
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
    setOpenMenuId(null);
  };

  const handleConfirmDelete = () => {
    removeApplication(deleteId);
    setShowConfirm(false);
  };

  return (
    <div className="registered-page">
      <ThanhTopbar />

      <main className="registered-content">
        {/* --- THANH TÌM KIẾM --- */}
        <div className="search-filter-section">
          <div className="search-bar">
            <div className="search-icon-box">
              <img src="/kinhlup.png" alt="Search" className="search-icon" />
            </div>
            <input type="text" placeholder="Looking for scholarship" className="search-input" />
          </div>
          <div className="filter-button">
            <img src="/filter.png" alt="Filter" className="filter-icon" />
          </div>
        </div>

        {/* --- HEADER: TIÊU ĐỀ ẢNH & TOGGLES --- */}
        <div className="registered-header">
          <img src="/Registered.png" alt="Registered Title" className="title-img" />
          
          <div className="toggle-group">
            {[
              { label: "Show rejected applications", state: filterRejected, setState: setFilterRejected },
              { label: "Show only accepted applications", state: filterAccepted, setState: setFilterAccepted },
              { label: "Show on checking applications", state: filterChecking, setState: setFilterChecking }
            ].map((item, i) => (
              <div className="toggle-item" key={i}>
                <span>{item.label}</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={item.state} 
                    onChange={() => item.setState(!item.state)} 
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* --- DANH SÁCH HỒ SƠ --- */}
        <div className="registered-list">
          {filteredList.length > 0 ? (
            filteredList.map((item) => (
              <div className="reg-card" key={item.id}>
                <input type="checkbox" className="reg-checkbox" />
                <img src={item.image} alt="Logo" className="reg-logo" />

                <div className="reg-info">
                  <h3>{item.title}</h3>
                  <p>Provider: {item.organization}</p>
                  <p className="app-id-text">Mã hồ sơ: <span>{item.appId}</span></p>
                </div>

                <div className="reg-time">
                  <img src="/time.png" alt="clock" className="icon-time" />
                  <span>{item.appliedDate || "19:00 30/06/2025"}</span>
                </div>

                <div className="reg-status-col">
                  <span className="status-label">status</span>
                  <div className="status-dots">
                    <div className={`dot ${item.status === "Checking" ? "active" : ""}`}></div>
                    <div className={`dot ${item.status === "Accepted" ? "active" : ""}`}></div>
                    <div className={`dot ${item.status === "Rejected" ? "active" : ""}`}></div>
                    <div className="dot"></div>
                  </div>
                  {item.status === "Rejected" && item.rejectionReason && (
                    <div className="rejection-reason-box">
                      <p><strong>Lý do:</strong> {item.rejectionReason}</p>
                    </div>
                  )}
                </div>

                <img src={getStatusIcon(item.status)} alt="status icon" className="status-emoji" />

                {/* MENU 3 CHẤM */}
                <div className="more-options-box">
                  <button 
                    className="btn-dots" 
                    onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                  >
                    ⋮
                  </button>
                  {openMenuId === item.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleDeleteClick(item.id)}>Xóa hồ sơ</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="empty-text">Không tìm thấy hồ sơ nào phù hợp.</p>
          )}
        </div>
      </main>

      {/* --- MODAL XÁC NHẬN XÓA --- */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box delete-confirm">
            <img src="/trash.png" alt="trash" className="modal-trash-icon" />
            <p>Are you sure you want to delete the selected file(s)?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowConfirm(false)}>CANCEL</button>
              <button className="btn-yes" onClick={handleConfirmDelete}>YES</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RegisteredHB;