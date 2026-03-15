
export const scholarshipScholarships = [
  {
    id: "SCH001",
    title: "Học bổng Hessen, Cộng hòa Liên bang Đức năm học 2025-2026",
    organization: "Bộ khoa học, Nghiên cứu, Văn hóa và Nghệ thuật bang Hessen CHLB Đức (HMWK)",
    target: "Sinh viên đại học hệ chính quy tập trung (khóa K22, K23, K24)",
    category: "khac", // Phân loại theo tab "Khác"
    image: "/HB Hessen.png",
    details: {
      quantity: "01 suất",
      value: "216 Euro/suất",
      conditions: [
        "Kết quả học tập học kỳ 2 năm học 2024-2025 đạt từ 7,5 điểm trở lên",
        "Hoàn cảnh gia đình khó khăn hoặc con thương binh, liệt sĩ, dân tộc thiểu số...",
        "Hiện không nhận hỗ trợ học bổng của tổ chức, cá nhân nào khác",
        "Có tham gia các hoạt động xã hội (hiến máu, tình nguyện, thiên tai...)"
      ],
      documents: [
        "Tờ khai thông tin (theo mẫu, viết tay)",
        "Lưu ý: Trong tờ khai thông tin cá nhân xin cấp học bổng: sinh viên cần viết hoa phần họ và tên, dán ảnh 4x6, ký và ghi rõ họ tên, viết tay vào hồ sơ gửi kèm theo này, không đánh máy vào bản mềm rồi in ra; ghi số thẻ sinh viên, ghi đầy đủ cả số điện thoại và đặc biệt là địa chỉ email liên hệ được để Văn phòng Hessen thông báo kết quả xét duyệt và lịch trao học bổng, cũng như gửi ảnh trao học bổng sau này.",
        "Chữ ký số và ghi rõ họ tên",
        "Giấy chứng nhận kết quả học tập (theo mẫu)",
        "Giấy xác nhận hoàn cảnh khó khăn",
        "Giấy chứng nhận tham gia các hoạt động xã hội.",
      ]
    }
  },
  {
    id: "SCH002",
    title: "HỌC BỔNG TOÀN CẦU HYUNDAI CHUNG MONG-KOO (CMK) – NĂM 2026",
    organization: "Quỹ Hyundai Chung Mong-Koo (Hàn Quốc)",
    target: "Sinh viên có khó khăn tài chính, có tiềm năng phát triển",
    category: "quy", // Phân loại theo tab "Quỹ"
    image: "/HB huyn dai.png", // Dựa trên ảnh mô tả Hyundai
    details: {
      quantity: "Không giới hạn (theo thỏa thuận)",
      value: "Học bổng toàn phần (học phí và sinh hoạt phí tại Hàn Quốc)",
      description: "Chương trình dành cho sinh viên bậc đại học dự kiến tham gia chương trình trao đổi 01 năm tại các trường đại học đối tác tại Hàn Quốc.",
      conditions: [
        "Sinh viên bậc đại học có kết quả học tập tốt",
        "Có hoàn cảnh tài chính khó khăn, cần hỗ trợ học bổng",
        "Có tiềm năng phát triển trong môi trường quốc tế"
      ],
      benefits: [
        "Học bổng toàn phần (học phí và sinh hoạt phí tại Hàn Quốc",
        "Tham gia các chương trình giao lưu, mạng lưới học giả CMK",
        "Học tập tại các trường đại học hàng đầu Hàn Quốc"
      ],
      documents: [
        "Sau khi được Trường đề cử, sinh viên bắt buộc nộp hồ sơ trực tuyến trên website chính thức của Học bổng CMK trong thời gian 25/02/2026 – 03/03/2026 theo quy định của Quỹ.",
      ]
    }
  },
  {
    id: "SCH003",
    title: "Học bổng the Canada-ASEAN Scholarships and Educational Exchanges for Development [SEED-2]",
    organization: "Chính phủ Canada",
    target: "Công dân Việt Nam",
    category: "trao_doi", // Phân loại theo tab "Trao đổi"
    image: "/canada.png",
    details: {
      value: "Học bổng trao đổi ngắn hạn tại Canada",
      conditions: ["Sinh viên thuộc khối ngành kinh tế, quản trị", "Thành thạo tiếng Anh hoặc tiếng Pháp"]
    }
  },
  {
    id: "SCH004",
    title: "Học bổng Chắp cánh",
    organization: "Trường Đại học Kinh tế - Luật",
    target: "Sinh viên đại học chính quy năm 1 – năm 3 (K23 – K25), có hoàn cảnh khó khăn",
    category: "khac",
    image: "/HBchapcanh.png",
    details: {
      value: "Hỗ trợ học phí",
      conditions: ["Có hoàn cảnh đặc biệt khó khăn", "Nỗ lực vươn lên trong học tập"]
    }
  },
  {
    id: "SCH005",
    title: "Học bổng trao đổi toàn phần Erasmus+ KA171 tại Ba Lan",
    organization: "Trường Đại học Kinh tế và Kinh doanh Poznań (PUEB), Ba Lan",
    target: "Sinh viên có điểm trung bình học tập tích lũy tối thiểu từ 8.0/10",
    category: "trao_doi",
    image: "/HB erasmus.png",
    details: {
      value: "Toàn phần (Vé máy bay + Sinh hoạt phí hàng tháng)",
      conditions: ["GPA > 8.0", "Chứng chỉ tiếng Anh B2 trở lên"]
    }
  },
  {
    id: "SCH006",
    title: "Học Bổng Future VPBanker 2025",
    organization: "VPBank",
    target: "Sinh viên năm 3, năm 4",
    category: "doanh_nghiep", // Phân loại theo tab "Doanh nghiệp"
    image: "/HP VP.png",
    details: {
      value: "Tiền mặt + Cơ hội thực tập và làm việc tại VPBank",
      conditions: ["Sinh viên các ngành Tài chính, Ngân hàng, CNTT", "GPA khá giỏi"]
    }
  },
  {
    id: "SCH007",
    title: "HỌC BỔNG POSCO TJ PARK",
    organization: "Quỹ POSCO TJ Park Foundation",
    target: "Sinh viên khóa K22, K23 học hệ chính quy tập trung",
    category: "quy",
    image: "/HB posco.png",
    details: {
      value: "1000 USD/năm",
      conditions: ["Duy trì kết quả học tập giỏi", "Chưa nhận học bổng doanh nghiệp khác"]
    }
  },
  {
    id: "SCH008",
    title: "Học bổng Quang Trung",
    organization: "Quỹ Học bổng Quang Trung",
    target: "Sinh viên quê Gia Lai & Gia đình là hộ nghèo/ hộ cận nghèo",
    category: "quy",
    image: "/HP QT.png",
    details: {
      value: "Hỗ trợ theo từng năm học",
      conditions: ["Quê quán Gia Lai", "Có sổ hộ nghèo hoặc xác nhận địa phương"]
    }
  }
];

// Các hàm bổ trợ (Helpers)
export const getScholarshipById = (id) => {
  return scholarshipScholarships.find((s) => s.id === id);
};

export const getScholarshipsByCategory = (category) => {
  if (category === "tat_ca") return scholarshipScholarships;
  return scholarshipScholarships.filter((s) => s.category === category);
};

export const scholarshipCategories = [
  { id: "tat_ca", name: "Tất cả" },
  { id: "doanh_nghiep", name: "Doanh nghiệp" },
  { id: "quy", name: "Quỹ" },
  { id: "trao_doi", name: "Trao đổi" },
  { id: "khac", name: "Khác" }
];