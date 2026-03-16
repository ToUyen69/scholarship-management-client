import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ScholarshipContext } from "../context/ScholarshipContext";
import "./ThanhTopbar.css";

const ThanhTopbar = () => {
  const navigate = useNavigate();
  const { notifications } = useContext(ScholarshipContext);
  
  // State quản lý menu
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("userLoggedIn"));
  const currentUserName = user ? user.username : "";
  const myNotis = notifications.filter(n => n.studentUser === currentUserName);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    setIsUserMenuOpen(false);
    navigate("/landing");
  };

  return (
    <header className="header-container">
      {/* DÒNG TRÊN: MÀU XANH */}
      <div className="top-blue-bar">
        <div className="container-wrapper flex-between">
          
          {/* 1. Bên trái: Liên hệ */}
          <div className="left-info">
            <div className="info-item">
              <img src="/PhoneCall.png" alt="Phone" className="icon-small" />
              <p className="contact-text"><span>Call us:</span> 028 37244559</p>
            </div>
            <div className="info-item">
              <img src="/Mail.png" alt="Mail" className="icon-small" />
              <p className="contact-text"><span>E-mail:</span> cntt@uel.edu.vn</p>
            </div>
          </div>

          {/* 2. Bên phải: CHỈ 1 KHỐI DUY NHẤT CHỨA 2 ICON */}
          <div className="right-actions-group">
            
            {/* ICON THÔNG BÁO */}
            <div className="notification-wrapper">
              <div className="icon-clickable" onClick={() => {
                setIsNotiOpen(!isNotiOpen);
                setIsUserMenuOpen(false);
              }}>
                <img src="/noti.png" alt="Noti" className="user-icon" />
                {myNotis.length > 0 && <span className="noti-badge">{myNotis.length}</span>}
              </div>

              {isNotiOpen && (
                <div className="noti-dropdown">
                  <div className="noti-header">Thông báo</div>
                  <div className="noti-body">
                    {myNotis.length > 0 ? myNotis.map(noti => (
                      <div key={noti.id} className={`noti-item ${noti.type}`}>
                        <p>{noti.message}</p>
                        <span>{noti.date}</span>
                      </div>
                    )) : <p className="noti-empty">Không có thông báo mới</p>}
                  </div>
                </div>
              )}
            </div>

            {/* ICON USER */}
            <div className="user-menu-container">
              <img 
                src="/user.png" 
                alt="User" 
                className="user-icon icon-clickable" 
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsNotiOpen(false);
                }} 
              />
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-item" onClick={() => navigate("/registered")}>Xem hồ sơ</div>
                  <div className="dropdown-item logout" onClick={handleLogout}>Đăng xuất</div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* DÒNG DƯỚI: MÀU TRẮNG */}
      <div className="bottom-white-bar">
        <div className="container-wrapper flex-between">
          <div className="logo-area">
            <img src="/logotron.png" alt="UEL" className="uel-logo" />
            <img src="/UEL scholarship hub.png" alt="Hub" className="logo-text-img" />
          </div>
          <nav className="nav-menu">
            <NavLink to="/list-hb" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>Homepage</NavLink>
            <NavLink to="/all-scholarship" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>UEL Scholarship</NavLink>
            <NavLink to="/registered" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>Registered Scholarships</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ThanhTopbar;