import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScholarshipContext } from "../context/ScholarshipContext";
import AdminTopbar from "../components/AdminTopbar";
import Footer from "../components/footer";
import "./CreateScholarship.css";

const CreateScholarship = () => {
  const navigate = useNavigate();
  const { addScholarship } = useContext(ScholarshipContext);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  // --- STATE FORM TỔNG ---
  const [formData, setFormData] = useState({
    id: `SCH_${Date.now()}`,
    title: "",
    organization: "",
    target: "",
    awards: "",
    gpa: "",
    image: "/HP VP.png", // Ảnh mặc định
    description: "",
    category: "khac",
  });

  // Xử lý upload ảnh
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Hoàn tất tạo học bổng
  const handleFinalCreate = () => {
    const newHB = {
      id: `SCH_${Date.now()}`, 
      title: formData.title,
      organization: formData.organization,
      target: formData.target,
      image: formData.image,
      category: formData.category,
      status: "Open", // Mặc định mở khi tạo mới
      details: {
        quantity: formData.awards,
        value: formData.gpa,
        conditions: formData.description.split("\n").filter(line => line.trim() !== "") 
      }
    };

    // Gọi hàm lưu vào Context
    addScholarship(newHB);
    
    // Chuyển sang màn hình thành công (Step 3)
    setStep(3);
  };

  return (
    <div className="create-hb-page">
      <AdminTopbar />
      <main className="create-hb-content">
        
        {/* --- BƯỚC 1: NHẬP THÔNG TIN CƠ BẢN --- */}
        {step === 1 && (
          <div className="step-container">
            <h1 className="create-title">CREATE SCHOLARSHIP</h1>
            <div className="create-grid">
              <div className="left-upload">
                <div className="preview-img-box" onClick={() => fileInputRef.current.click()}>
                  <img src={formData.image} alt="preview" />
                  <p>Upload Image (.png, .jpg)</p>
                </div>
                <input type="file" hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
              </div>
              <div className="right-inputs">
                <div className="input-item">
                  <label>Scholarship Name</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="input-item">
                  <label>Sponsor</label>
                  <input type="text" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                </div>
                <div className="input-item">
                  <label>Eligible Candidates</label>
                  <input type="text" value={formData.target} onChange={(e) => setFormData({...formData, target: e.target.value})} />
                </div>
                <div className="input-item">
                  <label>Number of Awards</label>
                  <input type="text" value={formData.awards} onChange={(e) => setFormData({...formData, awards: e.target.value})} />
                </div>
                <div className="input-item">
                  <label>GPA Requirement</label>
                  <input type="text" value={formData.gpa} onChange={(e) => setFormData({...formData, gpa: e.target.value})} />
                </div>
                <button className="btn-next" onClick={() => setStep(2)}>Next</button>
              </div>
            </div>
          </div>
        )}

        {/* --- BƯỚC 2: NHẬP CHI TIẾT --- */}
        {step === 2 && (
          <div className="step-container">
            <h1 className="create-title">ENTER SCHOLARSHIP DETAILS</h1>
            <div className="create-grid detail-step">
              <div className="left-side">
                <img src={formData.image} alt="poster" className="poster-min" />
                <div className="category-select">
                  {['doanh_nghiep', 'quy', 'trao_doi', 'khac'].map(cat => (
                    <label key={cat} className="radio-item">
                      <input type="radio" name="cat" checked={formData.category === cat} onChange={() => setFormData({...formData, category: cat})} />
                      <span>{cat.replace('_', ' ').toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="right-side">
                <label>Description</label>
                <textarea rows="15" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Mỗi dòng là một điều kiện..."></textarea>
                <button className="btn-create-final" onClick={handleFinalCreate}>Create</button>
              </div>
            </div>
          </div>
        )}

        {/* --- BƯỚC 3: THÀNH CÔNG --- */}
        {step === 3 && (
          <div className="success-screen">
             <img src="/UEL scholarship hub.png" alt="logo" className="hub-logo-big" />
             <div className="success-box">
                <img src="/tick.png" alt="success" className="tick-icon" />
                <p>Create scholarship successfully!</p>
                <button className="btn-back-admin" onClick={() => navigate("/admin-list")}>Back</button>
             </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default CreateScholarship;