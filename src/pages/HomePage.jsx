import React from "react";
import { useNavigate } from "react-router-dom"; // Dùng useNavigate thay cho Link
import "./HomePage.css";

export const DesktopHomePage = () => {
  const navigate = useNavigate(); // Khởi tạo hàm điều hướng

  return (
    <div className="desktop-home-page">
      <div className="slider-ngang">
        <div className="banner">
          <img className="image" alt="Image" src="/HomePage1.jpg" />
          <img className="img" alt="Image" src="/HomePage2.png" />
          <img className="image-2" alt="Image" src="/HomePage3.png" />
          <div className="rectangle" />
          <div className="div" />
        </div>
        <img className="UEL-logo-ban-quyen" alt="Uel logo" src="/Logo.png" />
      </div>

      <div className="account">
        <div className="rectangle-2" />

        {/* Thêm onClick trực tiếp vào div group */}
        <div 
          className="group" 
          onClick={() => navigate("/login")} 
          style={{ cursor: 'pointer', zIndex: 100 }}
        >
          <div className="rectangle-3" />
          <div className="text-wrapper">LOG IN</div>
        </div>

        <p className="p">You don’t have an ESH account?</p>
        <div className="text-wrapper-2">Register</div>
        <img className="thm-tiu-ph" alt="Hub" src="/UEL scholarship hub có note.png" />
      </div>
    </div>
  );
};

export default DesktopHomePage;