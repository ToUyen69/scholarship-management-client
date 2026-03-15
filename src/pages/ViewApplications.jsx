import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ScholarshipContext } from "../context/ScholarshipContext";
import AdminTopbar from "../components/AdminTopbar";
import Footer from "../components/footer";
import "./ViewApplications.css";

const ViewApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allScholarships, appliedScholarships, updateApplicationStatus } = useContext(ScholarshipContext);

  // State cho Modal từ chối
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedAppId, setSelectedAppId] = useState(null);

  const hb = allScholarships.find(s => s.id === id);
  const studentApps = appliedScholarships.filter(app => app.id === id);

  // Logic Duyệt (Tick xanh)
  const handleAccept = (appId) => {
    if (window.confirm("Xác nhận DUYỆT hồ sơ này? Hệ thống sẽ thông báo đến sinh viên.")) {
      updateApplicationStatus(appId, "Accepted");
    }
  };

  // Logic Mở khung từ chối
  const openRejectBox = (appId) => {
    setSelectedAppId(appId);
    setShowRejectModal(true);
  };

  // Logic Gửi thông báo từ chối
  const submitReject = () => {
    if (!reason.trim()) return alert("Vui lòng nhập lý do từ chối!");
    updateApplicationStatus(selectedAppId, "Rejected", reason);
    setShowRejectModal(false);
    setReason("");
    alert("Đã gửi thông báo từ chối đến sinh viên.");
  };

  if (!hb) return <div>Data not found</div>;

  return (
    <div className="view-app-page">
      <AdminTopbar />
      <main className="view-app-content">
        <div className="view-app-header">
           <button className="btn-back-link" onClick={() => navigate(-1)}>← Back to details</button>
           <h1 className="hb-name-title">{hb.title.toUpperCase()}</h1>
           <p className="app-count">Total: <strong>{studentApps.length}</strong> applications</p>
        </div>

        <div className="applications-list">
          {studentApps.map((app, index) => (
            <div className="app-item-card" key={index}>
              <div className="student-main-info">
                <div className="avatar-placeholder">{app.studentUser.charAt(0).toUpperCase()}</div>
                <div className="text-info">
                  <h3 className="student-name">{app.studentUser}</h3>
                  <p className="app-id-sub">Application ID: <span>{app.appId}</span></p>
                </div>
              </div>

              {/* XEM / TẢI TÀI LIỆU */}
              <div className="files-submitted">
                <p className="label-min">Documents ({app.files.length}):</p>
                <ul className="file-link-list">
                  {app.files.map((file, fIdx) => (
                    <li key={fIdx}>
                      <a href={`/${file}`} target="_blank" rel="noreferrer" title="Click to view/download">
                        📄 {file}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="app-status-box">
                <span className={`status-badge ${app.status.toLowerCase()}`}>
                  {app.status}
                </span>
                
                {/* Chỉ hiện nút hành động nếu đang là Checking */}
                {app.status === "Checking" && (
                  <div className="admin-actions-inline">
                    <button className="btn-tick" onClick={() => handleAccept(app.appId)}>✓</button>
                    <button className="btn-cross" onClick={() => openRejectBox(app.appId)}>✕</button>
                  </div>
                )}
                
                {app.status === "Rejected" && <p className="reason-preview">Reason: {app.rejectionReason}</p>}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* KHUNG NHẬP LÝ DO TỪ CHỐI (MODAL) */}
      {showRejectModal && (
        <div className="modal-overlay">
          <div className="modal-box reject-box">
             <div className="modal-header">
                <img src="/cancel.png" alt="reject" className="reject-icon-small" />
                <h3>Reason for Rejection</h3>
             </div>
             <p className="modal-sub">Mô tả chi tiết lý do hồ sơ chưa đạt để sinh viên nắm rõ thông tin.</p>
             <textarea 
               placeholder="Nhập lý do tại đây... (Ví dụ: Thiếu minh chứng GPA, file ảnh bị mờ...)" 
               value={reason}
               onChange={(e) => setReason(e.target.value)}
               rows="5"
             />
             <div className="modal-actions">
                <button className="btn-cancel-modal" onClick={() => setShowRejectModal(false)}>CANCEL</button>
                <button className="btn-send-notify" onClick={submitReject}>GỬI THÔNG BÁO</button>
             </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ViewApplications;