import React, { useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ScholarshipContext } from "../context/ScholarshipContext";
import AdminTopbar from "../components/AdminTopbar";
import Footer from "../components/footer";
import "./AdjustHB.css";

const AdjustHB = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allScholarships, updateScholarship } = useContext(ScholarshipContext);

  // Tìm học bổng hiện tại
  const hb = allScholarships.find((s) => s.id === id);

  // --- STATE QUẢN LÝ FORM ---
  const [formData, setFormData] = useState({
    title: hb?.title || "",
    organization: hb?.organization || "",
    target: hb?.target || "",
    image: hb?.image || "",
    // Chuyển mảng thành chuỗi để dễ edit trong textarea
    conditions: hb?.details?.conditions?.join("\n") || "",
    benefits: hb?.details?.benefits?.join("\n") || "",
    documents: hb?.details?.documents?.join("\n") || "",
    quantity: hb?.details?.quantity || "",
    value: hb?.details?.value || ""
  });

  const fileInputRef = useRef(null);

  if (!hb) return <div className="error-msg">Dữ liệu không tồn tại!</div>;

  // Xử lý đổi ảnh (Poster)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý lưu dữ liệu
  const handleSave = () => {
    const updatedHB = {
      ...hb,
      title: formData.title,
      organization: formData.organization,
      target: formData.target,
      image: formData.image,
      details: {
        ...hb.details,
        quantity: formData.quantity,
        value: formData.value,
        // Chuyển chuỗi ngược lại thành mảng
        conditions: formData.conditions.split("\n").filter(line => line.trim() !== ""),
        benefits: formData.benefits.split("\n").filter(line => line.trim() !== ""),
        documents: formData.documents.split("\n").filter(line => line.trim() !== ""),
      }
    };

    updateScholarship(hb.id, updatedHB);
    alert("Cập nhật học bổng thành công!");
    navigate(`/admin-scholarship/${hb.id}`);
  };

  return (
    <div className="adjust-page">
      <AdminTopbar />
      <main className="adjust-content">
        <h1 className="page-title">ADJUST SCHOLARSHIP</h1>

        <div className="adjust-container">
          {/* CỘT TRÁI: SỬA ẢNH */}
          <div className="adjust-left">
            <div className="poster-preview-box">
              <img src={formData.image} alt="Poster" />
              <div className="overlay-upload" onClick={() => fileInputRef.current.click()}>
                <span>Change Poster</span>
              </div>
            </div>
            <input type="file" hidden ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
            <p className="hint-text">Nhấn vào ảnh để thay đổi Poster</p>
          </div>

          {/* CỘT PHẢI: FORM CHỈNH SỬA */}
          <div className="adjust-right">
            <div className="form-group">
              <label>Tên học bổng:</label>
              <textarea 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Số suất:</label>
                <input type="text" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Giá trị:</label>
                <input type="text" value={formData.value} onChange={(e) => setFormData({...formData, value: e.target.value})} />
              </div>
            </div>

            <div className="form-group">
              <label>Đối tượng xét tuyển:</label>
              <input type="text" value={formData.target} onChange={(e) => setFormData({...formData, target: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Điều kiện (Mỗi dòng 1 điều kiện):</label>
              <textarea rows="5" value={formData.conditions} onChange={(e) => setFormData({...formData, conditions: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Hồ sơ yêu cầu:</label>
              <textarea rows="5" value={formData.documents} onChange={(e) => setFormData({...formData, documents: e.target.value})} />
            </div>

            <div className="adjust-actions">
              <button className="btn-cancel-adj" onClick={() => navigate(-1)}>Cancel</button>
              <button className="btn-save-adj" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdjustHB;