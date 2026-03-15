import React from "react";
import { useNavigate } from "react-router-dom";
import AdminTopbar from "../components/AdminTopbar";
import Footer from "../components/footer";
import "./DeleteSuccess.css";

const DeleteSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="delete-success-page">
      <AdminTopbar />
      <div className="success-content">
        <img src="/UEL scholarship hub.png" alt="Hub Logo" className="hub-logo-large" />
        <div className="success-card">
           <img src="/tick.png" alt="tick" className="tick-icon-large" />
           <p>Delete scholarship successfully!</p>
           <button className="btn-back-admin" onClick={() => navigate("/admin-list")}>Back</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeleteSuccess;