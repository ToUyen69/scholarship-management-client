// src/context/ScholarshipContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { scholarshipScholarships as initialData } from "../data/scholarshipData";

export const ScholarshipContext = createContext();

export const ScholarshipProvider = ({ children }) => {
  // --- 1. QUẢN LÝ DANH SÁCH HỌC BỔNG GỐC (DÀNH CHO ADMIN) ---
  const [allScholarships, setAllScholarships] = useState(() => {
    const saved = localStorage.getItem("all_scholarships_data");
    // Nếu chưa có, lấy từ file data và mặc định trạng thái là "Open"
    return saved ? JSON.parse(saved) : initialData.map(s => ({ ...s, status: "Open" }));
  });

  // --- 2. QUẢN LÝ DANH SÁCH HỒ SƠ ĐÃ APPLY (DÀNH CHO SINH VIÊN) ---
  const [appliedScholarships, setAppliedScholarships] = useState(() => {
    const saved = localStorage.getItem("appliedList");
    return saved ? JSON.parse(saved) : [];
  });

  // --- LOGIC SINH VIÊN ---

  // Hàm tạo mã hồ sơ ngẫu nhiên
  const generateAppId = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `UEL-${result}`;
  };

  // Hàm thêm hồ sơ ứng tuyển mới
  const addApplication = (scholarship, files, currentUser) => {
    const newEntry = {
      ...scholarship,
      studentUser: currentUser, // Gắn ID người dùng (username/email)
      appId: generateAppId(),
      appliedDate: new Date().toLocaleString(),
      status: "Checking",
      files: files.map(f => f.name),
      rejectionReason: "" // Khởi tạo lý do trống
    };
    
    const updatedList = [newEntry, ...appliedScholarships];
    setAppliedScholarships(updatedList);
    localStorage.setItem("appliedList", JSON.stringify(updatedList));
    return newEntry.appId;
  };

  // Hàm xóa hồ sơ ứng tuyển (dành cho sinh viên)
  const removeApplication = (id) => {
    const updatedList = appliedScholarships.filter(item => item.id !== id);
    setAppliedScholarships(updatedList);
    localStorage.setItem("appliedList", JSON.stringify(updatedList));
  };

  // --- LOGIC ADMIN (QUẢN LÝ HỌC BỔNG) ---

  // 1. Xóa học bổng vĩnh viễn khỏi hệ thống
  const deleteScholarship = (id) => {
    const newList = allScholarships.filter(s => s.id !== id);
    setAllScholarships(newList);
    localStorage.setItem("all_scholarships_data", JSON.stringify(newList));
  };

  // 2. Đóng/Mở học bổng (Ẩn/Hiện với sinh viên)
  const toggleScholarshipStatus = (id) => {
    const newList = allScholarships.map(s => 
      s.id === id ? { ...s, status: s.status === "Open" ? "Closed" : "Open" } : s
    );
    setAllScholarships(newList);
    localStorage.setItem("all_scholarships_data", JSON.stringify(newList));
  };

  // 3. Cập nhật nội dung học bổng sau khi sửa (Adjust)
  const updateScholarship = (id, updatedData) => {
    const newList = allScholarships.map(s => (s.id === id ? { ...s, ...updatedData } : s));
    setAllScholarships(newList);
    localStorage.setItem("all_scholarships_data", JSON.stringify(newList));
  };

  // --- LOGIC ADMIN (DUYỆT HỒ SƠ SINH VIÊN) - MỚI ---

 
  // 1. Quản lý danh sách thông báo
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("user_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Hàm thêm thông báo mới
  const addNotification = (studentUser, message, type) => {
    const newNoti = {
      id: Date.now(),
      studentUser,
      message,
      type, // 'success' hoặc 'error'
      date: new Date().toLocaleString(),
      isRead: false
    };
    const updatedNotis = [newNoti, ...notifications];
    setNotifications(updatedNotis);
    localStorage.setItem("user_notifications", JSON.stringify(updatedNotis));
  };

  // 3. Cập nhật hàm updateApplicationStatus của Admin để tự động gửi thông báo
  const updateApplicationStatus = (appId, newStatus, reason = "") => {
    const updatedList = appliedScholarships.map((app) => {
      if (app.appId === appId) {
        // Tạo nội dung thông báo
        const msg = newStatus === "Accepted" 
          ? `Chúc mừng! Hồ sơ học bổng [${app.title}] của bạn đã được DUYỆT.` 
          : `Rất tiếc! Hồ sơ học bổng [${app.title}] của bạn đã bị TỪ CHỐI. Lý do: ${reason}`;
        
        // Gửi thông báo
        addNotification(app.studentUser, msg, newStatus === "Accepted" ? "success" : "error");
        
        return { ...app, status: newStatus, rejectionReason: reason };
      }
      return app;
    });
    setAppliedScholarships(updatedList);
    localStorage.setItem("appliedList", JSON.stringify(updatedList));
  };
  const addScholarship = (newHB) => {
    const updatedList = [...allScholarships, { ...newHB, status: "Open" }];
    setAllScholarships(updatedList);
    localStorage.setItem("all_scholarships_data", JSON.stringify(updatedList));
    };

  return (
    <ScholarshipContext.Provider 
      value={{ 
        // Data & Logic Sinh viên
        appliedScholarships, 
        addApplication, 
        removeApplication,
        notifications, 
        updateApplicationStatus,
        
        // Data & Logic Admin
        allScholarships,
        addScholarship, 
        deleteScholarship,
        toggleScholarshipStatus,
        updateScholarship,
        updateApplicationStatus // Sếp dùng hàm này ở trang ViewApplications nhé
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
};