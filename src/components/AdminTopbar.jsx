import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./ThanhTopbar.css"; 

const AdminTopbar = () => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    setIsUserMenuOpen(false);
    navigate("/landing"); 
  };

  return (
    <header className="header-container">
      {/* DÒNG TRÊN: MÀU XANH (CONTACT & USER) - GIỮ NGUYÊN LOGIC CŨ */}
      <div className="top-blue-bar">
        <div className="container-wrapper flex-between">
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

          <div className="right-icons">
            <img src="/noti.png" alt="Notification" className="user-icon" />
            <div className="user-menu-container">
              <img 
                src="/user.png" 
                alt="Admin" 
                className="user-icon" 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
              />
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-item">Hồ sơ Admin</div>
                  <div className="dropdown-item logout" onClick={handleLogout}>Đăng xuất</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DÒNG DƯỚI: MÀU TRẮNG (NAV MENU DÀNH RIÊNG CHO ADMIN) */}
      <div className="bottom-white-bar">
        <div className="container-wrapper flex-between">
          <div className="logo-area">
            <img src="/logotron.png" alt="UEL Logo" className="uel-logo" />
            <img src="/UEL scholarship hub.png" alt="Logo Text" className="logo-text-img" />
          </div>

          <nav className="nav-menu">
            {/* 1. Nhấn Homepage -> Về trang chủ Admin (ADListHB) */}
            <NavLink 
              to="/admin-list" 
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              Homepage
            </NavLink>
            
            {/* 2. Nhấn UEL Scholarship -> Về trang list có bộ lọc (ADAllHB) */}
            <NavLink 
              to="/admin-all-scholarship" 
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              UEL Scholarship
            </NavLink>
            
            {/* 3. Nhấn Manage Scholarships -> Về trang quản lý (Admin Only) */}
            <NavLink 
              to="/admin-manage" 
              className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
            >
              Manage Scholarships
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;