import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ScholarshipContext } from "../context/ScholarshipContext";
import "./ScholarshipCard.css";

export const ScholarshipCard = ({ data }) => {
  // 1. Lấy dữ liệu từ Context
  const { appliedScholarships } = useContext(ScholarshipContext);
  const navigate = useNavigate();

  // 2. Lấy thông tin user hiện tại từ localStorage
  const userDataString = localStorage.getItem("userLoggedIn");
  const user = userDataString ? JSON.parse(userDataString) : null;
  
  const currentUserName = user ? user.username : null;
  const userRole = user ? user.role : null;

  // 3. Logic kiểm tra sinh viên đã nộp chưa (Giữ nguyên logic cũ)
  const isAppliedByMe = appliedScholarships.some(
    (item) => item.id === data.id && String(item.studentUser) === String(currentUserName)
  );

  // 4. Hàm xử lý điều hướng khi nhấn vào Card
  const handleCardClick = () => {
    // TRƯỜNG HỢP: ADMIN (Phòng Công tác sinh viên)
    if (userRole === "student_affairs_office") {
      navigate(`/admin-scholarship/${data.id}`);
      window.scrollTo(0, 0);
      return; // Kết thúc hàm
    }

    // TRƯỜNG HỢP: SINH VIÊN
    if (isAppliedByMe) {
      alert("Bạn đã nộp hồ sơ cho học bổng này rồi!");
      return;
    }

    // Nếu chưa nộp thì vào trang chi tiết của sinh viên
    navigate(`/scholarship/${data.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className={`scholarship-card ${isAppliedByMe && userRole !== "student_affairs_office" ? "applied-disabled" : ""}`} 
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      {/* Cụm bên trái: Ảnh logo học bổng */}
      <div className="card-logo-container">
        <img 
          className="card-logo" 
          src={data.image} 
          alt={data.title} 
        />
      </div>

      {/* Cụm bên phải: Nội dung thông tin */}
      <div className="card-body">
        <h3 className="card-title">{data.title}</h3>

        <div className="card-info-row">
          <span className="info-label">Đơn vị:</span>
          <span className="info-value">{data.organization}</span>
        </div>

        <div className="card-info-row">
          <span className="info-label">Đối tượng:</span>
          <span className="info-value">{data.target}</span>
        </div>
      </div>

      {/* Chỉ hiển thị nhãn "ĐÃ ỨNG TUYỂN" nếu là sinh viên đã nộp */}
      {isAppliedByMe && userRole !== "student_affairs_office" && (
        <div className="applied-overlay">ĐÃ ỨNG TUYỂN</div>
      )}
    </div>
  );
};