import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ThanhTopbar from "../components/ThanhTopbar";
import Footer from "../components/footer";
import { scholarshipScholarships } from "../data/scholarshipData";
import "./UpHB.css";
import { useContext } from "react";
import { ScholarshipContext } from "../context/ScholarshipContext";

const UpHB = () => {
  const { addApplication } = useContext(ScholarshipContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const hb = scholarshipScholarships.find((item) => item.id === id);

  // --- STATE QUẢN LÝ ---
  const [files, setFiles] = useState([]); // Danh sách file đã up
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [statusModal, setStatusModal] = useState(null); // 'success' hoặc 'error'

  const allowedTypes = ["image/jpeg", "image/png", "application/pdf", "video/mp4"];

  // --- LOGIC UPLOAD ---
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  const triggerUpload = () => fileInputRef.current.click();

  // --- LOGIC XÓA FILE ---
  const openDeleteModal = (index) => {
    setFileToDelete(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const newFiles = [...files];
    newFiles.splice(fileToDelete, 1);
    setFiles(newFiles);
    setShowDeleteModal(false);
  };
  const [generatedId, setGeneratedId] = useState("");

  // --- LOGIC SUBMIT (APPLY NOW) ---
  const handleApply = () => {
    const userDataString = localStorage.getItem("userLoggedIn");
    const user = userDataString ? JSON.parse(userDataString) : null;

// Lấy đúng trường 'username' từ file userData.js của bạn (student1, student2...)
    const currentUserName = user ? user.username : null; 
    
    // Điều kiện: Có ít nhất 1 file và tất cả file phải đúng định dạng
    const allValid = files.length > 0 && files.every(f => allowedTypes.includes(f.type));
    
    console.log("Kiểm tra User đang đăng nhập:", currentUserName);

    if (allValid) { 
      const appId = addApplication(hb, files, currentUserName); 
      setGeneratedId(appId);
      setStatusModal('success');
    } else {
      setStatusModal('error');
    }
  };

  if (!hb) return <div>Data error</div>;

  return (
    <div className="uphb-page">
      <ThanhTopbar />
      
      <main className="uphb-content">
        <h1 className="uphb-title">{hb.title.toUpperCase()}</h1>

        {/* Khu vực Drag & Drop */}
        <div className="upload-zone" onClick={triggerUpload}>
          <img src="/upload-cloud.png" alt="upload" className="upload-icon-main" />
          <p>Drag and drop files or <span className="browse-text">browse</span></p>
          <p className="formats">Supported formats: JPEG, PNG, PDF, MP4, PSD, AI</p>
          <input 
            type="file" 
            multiple 
            hidden 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
        </div>

        {/* Danh sách file đã tải lên */}
        <div className="file-list-container">
          <div className="list-header">
            <span>Uploading</span>
            <span className="file-count">{files.length} files</span>
          </div>

          {files.map((file, index) => (
            <div className="file-item" key={index}>
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <div className="progress-bar"><div className="progress-fill"></div></div>
              </div>
              <img 
                src="/trash.png" 
                alt="delete" 
                className="btn-trash" 
                onClick={() => openDeleteModal(index)} 
              />
            </div>
          ))}
        </div>

        <div className="action-btns">
            <button className="btn-back" onClick={() => navigate("/all-scholarship")}>Back</button>
            <button className="btn-apply-final" onClick={handleApply}>Apply Now</button>
        </div>
      </main>

      {/* MODAL XÁC NHẬN XÓA */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box confirm-box">
            <img src="/trash.png" alt="trash" className="modal-icon-large" />
            <p>Are you sure you want to delete the selected file(s)?</p>
            <div className="modal-btns">
              <button className="btn-cancel-modal" onClick={() => setShowDeleteModal(false)}>CANCEL</button>
              <button className="btn-yes-modal" onClick={confirmDelete}>YES</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL THÀNH CÔNG */}
      {statusModal === 'success' && (
        <div className="modal-overlay">
          <div className="modal-box status-box">
            <img src="/tick.png" alt="success" className="modal-icon-status" />
            <p>Your application was submitted successfully!</p>
            <p style={{fontWeight: '800', color: '#315088'}}>Mã hồ sơ của bạn: {generatedId}</p>
            <button className="btn-back-status" onClick={() => navigate("/all-scholarship")}>Back</button>
          </div>
        </div>
      )}

      {/* MODAL THẤT BẠI */}
      {statusModal === 'error' && (
        <div className="modal-overlay">
          <div className="modal-box status-box">
            <img src="/cancel.png" alt="fail" className="modal-icon-status" />
            <p>There was an error processing your application. Please review the form and resubmit.</p>
            <button className="btn-back-status" onClick={() => setStatusModal(null)}>Back</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UpHB;