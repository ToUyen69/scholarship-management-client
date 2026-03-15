import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../data/userData"; // Import logic xác thực
import "./Login.css";

export const DesktopLogin = () => {
  const navigate = useNavigate();

  // Khởi tạo state để lưu trữ dữ liệu nhập vào và thông báo lỗi
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hàm xử lý đăng nhập dựa trên dữ liệu từ userData.js
  const handleLogin = () => {
    const user = authenticateUser(username, password);

  if (user) {
    localStorage.setItem("userLoggedIn", JSON.stringify(user));
    if (user.role === "student") {
      navigate("/list-hb"); // Chuyển hướng khi đăng nhập thành công
    } 
    else if (user.role === "student_affairs_office") {
      // Nếu là Admin (Phòng CTSV) -> vào trang danh sách dành cho Admin
      console.log("Admin logged in");
      navigate("/admin-list"); // <--- THÊM DÒNG NÀY ĐỂ CHUYỂN TRANG
    }
  } else {
    setError("Sai tài khoản hoặc mật khẩu!");
  }
};

  return (
    <div className="desktop-login">
      {/* Background và các thành phần trang trí giữ nguyên */}
      <img className="rectangle" alt="Rectangle" src="/login.jpg" />
      <div className="div" />

      {/* NÚT LOG IN: Thêm sự kiện onClick */}
      <div className="group" onClick={handleLogin} style={{ cursor: "pointer" }}>
        <div className="rectangle-2" />
        <div className="text-wrapper">LOG IN</div>
      </div>

      <p className="p">You don’t have an EMS account?</p>
      <div className="text-wrapper-2">Log in with</div>
      <div className="text-wrapper-3" style={{ cursor: "pointer" }}>Register</div>

      <img className="img" alt="Logo" src="/logo xanh.png" />

      {/* Ô NHẬP ACCOUNT: Giữ nguyên class group-2 và rectangle-3 của bạn */}
      <div className="group-2">
        <div className="rectangle-3" />
        <input 
          className="text-wrapper-4"
          placeholder="Account Name / Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            position: "absolute",
            border: "none",
            background: "transparent",
            outline: "none",
            width: "100%",
            height: "100%",
            textAlign: "center",
            left: 0,
            top: 0,
            zIndex: 10
          }}
        />
      </div>

      {/* Ô NHẬP PASSWORD: Giữ nguyên class group-3 và rectangle-4 của bạn */}
      <div className="group-3">
        <div className="rectangle-4" />
        <input 
          type="password"
          className="text-wrapper-5"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          style={{
            position: "absolute",
            border: "none",
            background: "transparent",
            outline: "none",
            width: "100%",
            height: "100%",
            textAlign: "center",
            left: 0,
            top: 0,
            zIndex: 10
          }}
        />
      </div>

      {/* Hiển thị lỗi nếu đăng nhập thất bại */}
      {error && (
        <p style={{ 
          position: "absolute", 
          top: "450px", 
          width: "100%", 
          textAlign: "center", 
          color: "red",
          fontWeight: "bold" 
        }}>
          {error}
        </p>
      )}

      <div className="rectangle-5" />

      <div className="div-wrapper" style={{ cursor: "pointer" }}>
        <div className="text-wrapper-6">Google Account</div>
      </div>

      <img className="line" alt="Line" src="/line-1.svg" />
      <img className="rectangle-6" alt="Rectangle" src="/GG.png" />
    </div>
  );
};
export default DesktopLogin;