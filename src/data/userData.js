
export const mockUsers = [
  // STUDENT ACCOUNTS (Đối tượng Sinh viên)
  {
    id: "S001",
    username: "Trương Phạm Quỳnh Thư",
    password: "123456",
    email: "truongphamquynhthu@student.uel.edu.vn",
    role: "student",
    profile: {
      fullName: "Trương Phạm Quỳnh Thư",
      studentId: "K234161861",
      class: "K23416",
      faculty: "Khoa Hệ thống thông tin",
      gender: "Nữ",
      phone: "0364839882",
      gpa: 3.85, // Thêm điểm GPA để xét học bổng
      trainingPoint: 95, // Điểm rèn luyện
      incomeStatus: "Bình thường", // Tình trạng kinh tế (cho các học bổng vượt khó)
      dateOfBirth: "2005-01-15",
      year: "Năm 2",
    },
    appliedScholarships: ["SCH001", "SCH003"], // Danh sách học bổng đã nộp
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "S002",
    username: "Lê Tố Uyên",
    password: "123456",
    email: "le.to.uyen@student.uel.edu.vn",
    role: "student",
    profile: {
      fullName: "Lê Tố Uyên",
      studentId: "K224110002",
      class: "K22411",
      faculty: "Khoa Kinh tế",
      gender: "Nữ",
      phone: "0909888777",
      gpa: 3.92,
      trainingPoint: 88,
      incomeStatus: "Hộ nghèo",
      dateOfBirth: "2004-10-20",
      year: "Năm 3",
    },
    appliedScholarships: ["SCH002"],
    createdAt: "2024-01-20T00:00:00Z",
  },

  // STUDENT AFFAIRS OFFICE (Phòng Công tác Sinh viên - Admin)
  {
    id: "A001",
    username: "pctsv_admin",
    password: "123456",
    email: "pctsv@uel.edu.vn",
    role: "student_affairs_office",
    profile: {
      fullName: "Phòng Công tác Sinh viên UEL",
      office: "Phòng A001, Tòa nhà A",
      position: "Quản trị hệ thống Học bổng",
      contactPhone: "028 3724 4555",
      permissions: [
        "create_scholarship",   // Tạo học bổng mới
        "approve_application",  // Duyệt hồ sơ sinh viên
        "reject_application",   // Từ chối hồ sơ
        "manage_students",      // Quản lý danh sách sinh viên
        "view_reports",         // Xem báo cáo thống kê
        "system_admin"          // Toàn quyền hệ thống
      ],
    },
    managedScholarships: ["SCH001", "SCH002", "SCH003", "SCH004"],
    approvalHistory: [
      { studentId: "S001", scholarshipId: "SCH001", action: "approved", date: "2024-02-10T10:00:00Z" },
      { studentId: "S002", scholarshipId: "SCH002", action: "pending", date: "2024-02-11T14:30:00Z" },
    ],
    createdAt: "2024-01-01T00:00:00Z",
  },
];

// --- AUTHENTICATION HELPERS ---

// Kiểm tra đăng nhập
export const authenticateUser = (username, password) => {
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

// Lấy danh sách user theo vai trò (student hoặc student_affairs_office)
export const getUserByRole = (role) => {
  return mockUsers.filter((user) => user.role === role);
};

export const getUserById = (id) => {
  return mockUsers.find((user) => user.id === id);
};

// --- ROLE PERMISSIONS (Quyền hạn của từng đối tượng) ---

export const rolePermissions = {
  student: [
    "view_scholarships",        // Xem danh sách học bổng
    "apply_scholarship",        // Nộp hồ sơ học bổng
    "view_own_applications",    // Xem trạng thái hồ sơ của mình
    "update_profile",           // Cập nhật thông tin cá nhân
  ],
  student_affairs_office: [
    "view_all_scholarships",
    "create_scholarship",
    "edit_scholarship",
    "delete_scholarship",
    "view_all_applications",
    "approve_application",
    "reject_application",
    "manage_users",
    "view_statistics",
  ],
};

// Kiểm tra quyền hạn cụ thể
export const hasPermission = (userRole, permission) => {
  return rolePermissions[userRole]?.includes(permission) || false;
};

// Thông tin đăng nhập mặc định để bạn test các trang Dashboard
export const defaultCredentials = {
  student: { username: "student1", password: "123456" },
  admin: { username: "pctsv_admin", password: "admin_password_123" },
};