import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScholarshipProvider } from "./context/ScholarshipContext";

// Import các trang
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ListHB from "./pages/ListHB";
import AllHB from "./pages/AllHB";
import DetailHB from "./pages/DetailHB"; 
import UpHB from "./pages/UpHB";
import RegisteredHB from "./pages/RegisteredHB"; 
import DesktopADListHB from "./pages/ADListHB";
import ADAllHB from "./pages/ADAllHB";
import ADDetailHB from "./pages/ADDetailHB";
import AdjustHB from "./pages/AdjustHB";
import ViewApplications from "./pages/ViewApplications";
import ViewReport from "./pages/ViewReport";
import CreateScholarship from "./pages/CreateScholarship";


function App() {
  return (
    <ScholarshipProvider>

      <Router>
        <Routes>
           {/* Trang cho sinh viên */}

          {/* 1. Mở web lên là thấy Landing Page (HomePage) */}
          <Route path="/" element={<ListHB />} />
          {/* 2. Trang Đăng nhập */}
          <Route path="/login" element={<Login />} />
          {/* 3. Sau khi nhấn Login thành công -> Vào ListHB (Đây là Homepage sau login) */}
          <Route path="/list-hb" element={<ListHB />} />

          {/* 4. Nhấn UEL Scholarship trên Topbar -> Vào AllHB (Trang có lọc) */}
          <Route path="/all-scholarship" element={<AllHB />} />

          {/* 5. Trang Chi tiết học bổng (Route động nhận ID) */}
          <Route path="/scholarship/:id" element={<DetailHB />} />

          <Route path="/apply/:id" element={<UpHB />} />

          <Route path="/registered" element={<RegisteredHB />} />
          <Route path="/landing" element={<HomePage />} /> 

          {/* Trang cho Admin */}
          <Route path="/admin-list" element={<DesktopADListHB />} />
          <Route path="/admin-all-scholarship" element={<ADAllHB />} />
          <Route path="/admin-scholarship/:id" element={<ADDetailHB />} />
          <Route path="/admin/adjust/:id" element={<AdjustHB />} />
          <Route path="/admin/applications/:id" element={<ViewApplications />} />
          <Route path="/admin/report/:id" element={<ViewReport />} />
          <Route path="/admin-manage" element={<CreateScholarship />} />

          
        </Routes>
      </Router>

    </ScholarshipProvider>
  );
}

export default App;