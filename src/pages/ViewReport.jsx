import React, { useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ScholarshipContext } from "../context/ScholarshipContext";
import AdminTopbar from "../components/AdminTopbar";
import Footer from "../components/footer";

// Import các thư viện vừa cài đặt
import { Pie } from "react-chartjs-2";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import "./ViewReport.css";

// Đăng ký các thành phần của biểu đồ
ChartJS.register(ArcElement, Tooltip, Legend);

const ViewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dashboardRef = useRef(); // Dùng để chụp ảnh xuất PDF
  
  const { allScholarships, appliedScholarships } = useContext(ScholarshipContext);

  // 1. Tìm thông tin học bổng hiện tại
  const hb = allScholarships.find(s => s.id === id);
  // 2. Lọc các hồ sơ sinh viên đã nộp cho học bổng này
  const apps = appliedScholarships.filter(app => app.id === id);

  // --- LOGIC THỐNG KÊ SỐ LIỆU ---
  const total = apps.length;
  const accepted = apps.filter(a => a.status === "Accepted").length;
  const rejected = apps.filter(a => a.status === "Rejected").length;
  const checking = apps.filter(a => a.status === "Checking").length;

  // Dữ liệu cho biểu đồ tròn (Pie Chart)
  const pieData = {
    labels: ['Đã Duyệt (Accepted)', 'Từ Chối (Rejected)', 'Đang Chờ (Checking)'],
    datasets: [{
      data: [accepted, rejected, checking],
      backgroundColor: ['#1e8e3e', '#d93025', '#ef7d31'],
      hoverOffset: 10
    }]
  };

  // --- HÀM XUẤT FILE EXCEL THẬT ---
  const handleExportExcel = () => {
    // Chuẩn bị dữ liệu hàng ngang cho Excel
    const excelData = apps.map(item => ({
      "Mã Hồ Sơ": item.appId,
      "Tên Sinh Viên": item.studentUser,
      "Ngày Ứng Tuyển": item.appliedDate,
      "Trạng Thái": item.status,
      "Lý Do Từ Chối": item.rejectionReason || "N/A"
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachSinhVien");
    
    // Tải file về máy
    XLSX.writeFile(workbook, `Bao_cao_Hoc_Bong_${id}.xlsx`);
  };

  // --- HÀM TẢI DASHBOARD (PDF) THẬT ---
  const handleDownloadPDF = () => {
    const element = dashboardRef.current;
    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Dashboard_Thong_Ke_${id}.pdf`);
    });
  };

  if (!hb) return <div className="error-container">Không tìm thấy dữ liệu học bổng!</div>;

  return (
    <div className="report-page">
      <AdminTopbar />
      
      <main className="report-main-content">
        <div className="report-header-section">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
          <h1 className="report-main-title">REPORT DASHBOARD</h1>
          <h2 className="hb-title-sub">{hb.title}</h2>
          
          <div className="action-buttons-group">
            <button className="btn-download excel" onClick={handleExportExcel}>Export Excel List</button>
            <button className="btn-download pdf" onClick={handleDownloadPDF}>Download Dashboard (PDF)</button>
          </div>
        </div>

        {/* PHẦN NÀY SẼ ĐƯỢC CHỤP ẢNH ĐỂ XUẤT PDF */}
        <div className="dashboard-grid" ref={dashboardRef}>
          
          {/* CÁC THẺ SỐ LIỆU NHANH */}
          <div className="stats-row">
            <div className="stat-card blue">
              <span className="stat-num">{total}</span>
              <span className="stat-label">Total Applied</span>
            </div>
            <div className="stat-card green">
              <span className="stat-num">{accepted}</span>
              <span className="stat-label">Accepted</span>
            </div>
            <div className="stat-card red">
              <span className="stat-num">{rejected}</span>
              <span className="stat-label">Rejected</span>
            </div>
            <div className="stat-card orange">
              <span className="stat-num">{checking}</span>
              <span className="stat-label">Checking</span>
            </div>
          </div>

          <div className="visual-section">
            {/* BIỂU ĐỒ TRÒN */}
            <div className="chart-container-box">
              <h3>Status Distribution</h3>
              <div className="pie-wrapper">
                <Pie data={pieData} />
              </div>
            </div>

            {/* BẢNG TÓM TẮT NHANH */}
            <div className="summary-table-box">
              <h3>Recent Activity</h3>
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.slice(0, 5).map(app => (
                    <tr key={app.appId}>
                      <td>{app.studentUser}</td>
                      <td>{app.appliedDate.split(',')[0]}</td>
                      <td><span className={`status-dot ${app.status.toLowerCase()}`}></span>{app.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {apps.length > 5 && <p className="more-text">And {apps.length - 5} more...</p>}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewReport;