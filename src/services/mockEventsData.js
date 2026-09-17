export const MOCK_USERS = [
    { _id: 'u-1', name: 'Huỳnh Trần Hữu Nhật', email: 'nhat.huynh@airobot.edu.vn', role: 'Admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nhat' },
    { _id: 'u-2', name: 'Nguyễn Văn Minh', email: 'minh.nguyen@airobot.edu.vn', role: 'Leader Kỹ Thuật', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh' },
    { _id: 'u-3', name: 'Trần Thị Mai', email: 'mai.tran@airobot.edu.vn', role: 'Quản lý Học vụ', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai' },
    { _id: 'u-4', name: 'Lê Hoàng Long', email: 'long.le@airobot.edu.vn', role: 'Trưởng ban Truyền thông', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Long' },
    { _id: 'u-5', name: 'Phạm Đức Anh', email: 'anh.pham@airobot.edu.vn', role: 'Kỹ sư Robotics', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anh' },
    { _id: 'u-6', name: 'Võ Thị Thanh', email: 'thanh.vo@airobot.edu.vn', role: 'Hậu cần & Tài chính', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thanh' },
];

export const MOCK_TAGS = [
    { _id: 'tag-1', name: 'Robotics', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
    { _id: 'tag-2', name: 'AI & IoT', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
    { _id: 'tag-3', name: 'Giải Đấu', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
    { _id: 'tag-4', name: 'Workshop', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' },
    { _id: 'tag-5', name: 'Trường Học', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' },
];

export const MOCK_TEMPLATES = [
    {
        _id: 'tpl-1',
        name: 'Cuộc thi AI Robotics Championship',
        code: 'TPL-ROBOTIC-COMPETITION',
        type: 'competition',
        description: 'Mẫu quy trình chuẩn bị và tổ chức giải đấu Robotics cho học sinh trung tâm (VEX, Robofight, WRO...). Đầy đủ 5 giai đoạn, 22 khâu chuẩn bị từ D-45 đến D-Day và sau sự kiện.',
        icon: 'trophy',
        isDefault: true,
        roadmapNodes: [
            { id: 'p1', parentId: null, name: '1. Lập kế hoạch & Ban hành điều lệ', description: 'Giai đoạn chuẩn bị khung pháp lý, dự toán kinh phí và cơ cấu giải thưởng.', relativeDaysStart: -45, relativeDaysDue: -30, priority: 'high', order: 1 },
            { id: 'p1-1', parentId: 'p1', name: 'Soạn thảo và phê duyệt Thể lệ thi đấu', description: 'Quy định độ tuổi, kích thước robot, luật đấu và thang điểm.', relativeDaysStart: -45, relativeDaysDue: -38, priority: 'high', order: 2 },
            { id: 'p1-2', parentId: 'p1', name: 'Lập bảng dự toán ngân sách & duyệt chi', description: 'Kinh phí sân bãi, quà tặng, linh kiện, truyền thông.', relativeDaysStart: -40, relativeDaysDue: -35, priority: 'urgent', order: 3 },
            { id: 'p1-3', parentId: 'p1', name: 'Thành lập Ban tổ chức & Phân công nhiệm vụ', description: 'Phân công Trưởng ban, Tổ trọng tài, Tổ kỹ thuật, Tổ hậu cần.', relativeDaysStart: -35, relativeDaysDue: -30, priority: 'medium', order: 4 },

            { id: 'p2', parentId: null, name: '2. Truyền thông & Tiếp nhận đăng ký', description: 'Quảng bá giải đấu, mở cổng đăng ký và chốt danh sách đội thi.', relativeDaysStart: -30, relativeDaysDue: -15, priority: 'high', order: 5 },
            { id: 'p2-1', parentId: 'p2', name: 'Thiết kế Poster, Banner & Ấn phẩm truyền thông', description: 'Key visual giải đấu, backdrop sân khấu, standee.', relativeDaysStart: -30, relativeDaysDue: -25, priority: 'medium', order: 6 },
            { id: 'p2-2', parentId: 'p2', name: 'Mở đơn đăng ký & Gửi thông báo đến Phụ huynh', description: 'Gửi tin qua Zalo ZNS, đăng thông báo trên hệ thống.', relativeDaysStart: -25, relativeDaysDue: -18, priority: 'high', order: 7 },
            { id: 'p2-3', parentId: 'p2', name: 'Chốt danh sách, chia bảng đấu & bốc thăm', description: 'Xếp lịch thi đấu, phổ biến quy chế cho các đội.', relativeDaysStart: -18, relativeDaysDue: -15, priority: 'high', order: 8 },

            { id: 'p3', parentId: null, name: '3. Cơ sở vật chất & Kỹ thuật sân đấu', description: 'Setup sa bàn, kiểm tra robot, hệ thống âm thanh và phần mềm tính điểm.', relativeDaysStart: -15, relativeDaysDue: -2, priority: 'high', order: 9 },
            { id: 'p3-1', parentId: 'p3', name: 'Lắp ráp sa bàn thi đấu & kiểm tra linh kiện robot', description: 'Kiểm tra độ chính xác kích thước sàn đấu và phụ kiện.', relativeDaysStart: -14, relativeDaysDue: -7, priority: 'urgent', order: 10 },
            { id: 'p3-2', parentId: 'p3', name: 'Cài đặt màn hình LED & Phần mềm tính điểm', description: 'Hệ thống đồng hồ bấm giờ, bảng điểm trực tiếp.', relativeDaysStart: -7, relativeDaysDue: -3, priority: 'medium', order: 11 },
            { id: 'p3-3', parentId: 'p3', name: 'Đặt cúp, huy chương, giấy chứng nhận & quà tặng', description: 'Kiểm tra in ấn tên giải thưởng và logo trung tâm.', relativeDaysStart: -15, relativeDaysDue: -5, priority: 'medium', order: 12 },
            { id: 'p3-4', parentId: 'p3', name: 'Tập dượt thử (Rehearsal) & Họp tổ Trọng tài', description: 'Chạy thử kịch bản, thống nhất tình huống tranh chấp.', relativeDaysStart: -3, relativeDaysDue: -1, priority: 'high', order: 13 },

            { id: 'p4', parentId: null, name: '4. Ngày diễn ra Sự kiện (D-Day)', description: 'Vận hành toàn bộ chương trình thi đấu và trao giải.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'urgent', order: 14 },
            { id: 'p4-1', parentId: 'p4', name: 'Đón tiếp, điểm danh QR & Phát thẻ thí sinh', description: 'Khu vực check-in tại sảnh chính.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'urgent', order: 15 },
            { id: 'p4-2', parentId: 'p4', name: 'Lễ Khai mạc & Giới thiệu Ban giám khảo', description: 'Tuyên bố lý do, phổ biến luật thi đấu.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'high', order: 16 },
            { id: 'p4-3', parentId: 'p4', name: 'Điều phối các vòng thi đấu (Vòng bảng & Chung kết)', description: 'Trọng tài ghi điểm, chụp ảnh từng trận đấu.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'urgent', order: 17 },
            { id: 'p4-4', parentId: 'p4', name: 'Lễ Bế mạc, Trao giải & Chụp ảnh lưu niệm', description: 'Trao cúp, huy chương, chứng nhận cho thí sinh.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'high', order: 18 },

            { id: 'p5', parentId: null, name: '5. Tổng kết & Đánh giá sau sự kiện', description: 'Hoàn thiện hồ sơ truyền thông, album ảnh và quyết toán tài chính.', relativeDaysStart: 1, relativeDaysDue: 7, priority: 'medium', order: 19 },
            { id: 'p5-1', parentId: 'p5', name: 'Upload toàn bộ Album ảnh lên Google Drive & Chia sẻ', description: 'Gửi link ảnh gốc chất lượng cao cho phụ huynh.', relativeDaysStart: 1, relativeDaysDue: 3, priority: 'high', order: 20 },
            { id: 'p5-2', parentId: 'p5', name: 'Họp rút kinh nghiệm & Viết báo cáo tổng kết', description: 'Đánh giá chỉ số thành công, ghi nhận bài học cải tiến.', relativeDaysStart: 2, relativeDaysDue: 5, priority: 'medium', order: 21 },
            { id: 'p5-3', parentId: 'p5', name: 'Quyết toán chi phí thực tế & Hoàn tất chứng từ', description: 'Đối soát ngân sách dự toán với hóa đơn thực tế.', relativeDaysStart: 3, relativeDaysDue: 7, priority: 'high', order: 22 },
        ],
        budgetItems: [
            { id: 'b1', name: 'Cúp lưu niệm & Huy chương vàng/bạc/đồng', category: 'prizes', defaultEstimatedCost: 2500000, note: 'Bộ 3 cúp + 30 huy chương' },
            { id: 'b2', name: 'In ấn Backdrop, Standee, Băng rôn, Bảng tên', category: 'marketing', defaultEstimatedCost: 1800000, note: 'Khổ 4x2.5m + 2 standee' },
            { id: 'b3', name: 'Vật liệu làm sa bàn & Linh kiện bổ sung', category: 'equipment', defaultEstimatedCost: 1500000, note: 'Tấm foam, phụ kiện, pin robot' },
            { id: 'b4', name: 'Nước uống, Teabreak cho học sinh & phụ huynh', category: 'catering', defaultEstimatedCost: 1200000, note: 'Bánh ngọt, nước suối, trái cây' },
            { id: 'b5', name: 'Bồi dưỡng trọng tài & ban tổ chức', category: 'logistics', defaultEstimatedCost: 2000000, note: 'Phụ cấp ngày diễn ra sự kiện' },
            { id: 'b6', name: 'Dự phòng phát sinh', category: 'other', defaultEstimatedCost: 1000000, note: 'Chi phí đột xuất' },
        ],
    },
    {
        _id: 'tpl-2',
        name: 'Workshop Trải nghiệm STEM & Tuyển sinh',
        code: 'TPL-STEM-WORKSHOP',
        type: 'workshop',
        description: 'Mẫu sự kiện trải nghiệm chế tạo robot mở cho học viên mới và phụ huynh quan tâm (4 giai đoạn, 13 khâu chuẩn bị).',
        icon: 'chalkboard-teacher',
        isDefault: true,
        roadmapNodes: [
            { id: 'ws1', parentId: null, name: '1. Chuẩn bị chủ đề & Giáo án trải nghiệm', description: 'Lựa chọn mô hình lắp ráp robot hấp dẫn, phù hợp 6-14 tuổi.', relativeDaysStart: -20, relativeDaysDue: -12, priority: 'high', order: 1 },
            { id: 'ws1-1', parentId: 'ws1', name: 'Biên soạn slide thuyết trình & Kịch bản workshop', description: 'Slide tương tác, trò chơi khởi động, bài học chế tạo.', relativeDaysStart: -20, relativeDaysDue: -14, priority: 'medium', order: 2 },
            { id: 'ws1-2', parentId: 'ws1', name: 'Chính sách ưu đãi học phí & Quà tặng tuyển sinh', description: 'Voucher giảm giá khóa học khi đăng ký tại chỗ.', relativeDaysStart: -15, relativeDaysDue: -12, priority: 'high', order: 3 },

            { id: 'ws2', parentId: null, name: '2. Truyền thông & Chốt học viên tham dự', description: 'Tuyển sinh học viên trải nghiệm qua kênh Marketing và Phụ huynh giới thiệu.', relativeDaysStart: -14, relativeDaysDue: -3, priority: 'high', order: 4 },
            { id: 'ws2-1', parentId: 'ws2', name: 'Đăng bài truyền thông & Quảng bá workshop', description: 'Kênh Facebook, Zalo OA, phát tờ rơi trường học.', relativeDaysStart: -14, relativeDaysDue: -7, priority: 'medium', order: 5 },
            { id: 'ws2-2', parentId: 'ws2', name: 'Gọi điện xác nhận & Hướng dẫn phụ huynh', description: 'Telesale xác nhận lịch, dặn dò học cụ.', relativeDaysStart: -5, relativeDaysDue: -2, priority: 'urgent', order: 6 },

            { id: 'ws3', parentId: null, name: '3. Setup phòng học & Vận hành Workshop', description: 'Đón tiếp, hướng dẫn học sinh chế tạo và tư vấn khóa học.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'urgent', order: 7 },
            { id: 'ws3-1', parentId: 'ws3', name: 'Check-in đón tiếp phụ huynh & học sinh', description: 'Phát tài liệu, hướng dẫn chỗ ngồi.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'high', order: 8 },
            { id: 'ws3-2', parentId: 'ws3', name: 'Giáo viên hướng dẫn chế tạo & Thử nghiệm robot', description: 'Học sinh hoàn thành sản phẩm và thi thử mini.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'urgent', order: 9 },
            { id: 'ws3-3', parentId: 'ws3', name: 'Tư vấn lộ trình học & Chốt ghi danh khóa chính', description: 'Đội ngũ tư vấn làm việc trực tiếp với phụ huynh.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'urgent', order: 10 },

            { id: 'ws4', parentId: null, name: '4. Chăm sóc sau sự kiện & Thống kê chuyển đổi', description: 'Gửi ảnh, liên hệ chăm sóc học viên chưa chốt và báo cáo.', relativeDaysStart: 1, relativeDaysDue: 5, priority: 'high', order: 11 },
            { id: 'ws4-1', parentId: 'ws4', name: 'Gửi hình ảnh & Video kỷ niệm cho Phụ huynh', description: 'Tạo album Drive và gửi link qua Zalo.', relativeDaysStart: 1, relativeDaysDue: 2, priority: 'high', order: 12 },
            { id: 'ws4-2', parentId: 'ws4', name: 'Báo cáo tỷ lệ chuyển đổi học viên chính thức', description: 'Thống kê số lượng tham gia / số lượng đăng ký khóa học.', relativeDaysStart: 2, relativeDaysDue: 4, priority: 'medium', order: 13 },
        ],
        budgetItems: [
            { id: 'wb1', name: 'Quà tặng lưu niệm cho học sinh (Bút, sổ, móc khóa)', category: 'prizes', defaultEstimatedCost: 800000, note: '30 phần quà nhỏ' },
            { id: 'wb2', name: 'Teabreak nhẹ (Bánh snack, nước trái cây)', category: 'catering', defaultEstimatedCost: 500000, note: 'Phục vụ phụ huynh và bé' },
            { id: 'wb3', name: 'Chi phí in ấn tờ rơi, brochure khóa học', category: 'marketing', defaultEstimatedCost: 600000, note: '50 bộ brochure màu' },
        ],
    },
    {
        _id: 'tpl-3',
        name: 'Lễ Tổng kết & Triển lãm E-Portfolio (Showcase)',
        code: 'TPL-SHOWCASE-GRADUATION',
        type: 'showcase',
        description: 'Mẫu sự kiện báo cáo dự án cuối khóa của học viên kết hợp triển lãm sản phẩm công nghệ (4 giai đoạn, 12 khâu).',
        icon: 'star',
        isDefault: true,
        roadmapNodes: [
            { id: 'sh1', parentId: null, name: '1. Chuẩn bị dự án & Hướng dẫn thuyết trình', description: 'Học sinh hoàn thiện mô hình robot và slide thuyết trình.', relativeDaysStart: -21, relativeDaysDue: -7, priority: 'high', order: 1 },
            { id: 'sh1-1', parentId: 'sh1', name: 'Duyệt bài thuyết trình và sản phẩm robot của học sinh', description: 'Giáo viên chủ nhiệm hướng dẫn chỉnh sửa.', relativeDaysStart: -21, relativeDaysDue: -10, priority: 'high', order: 2 },
            { id: 'sh1-2', parentId: 'sh1', name: 'In ấn Chứng nhận tốt nghiệp & Huy hiệu E-Portfolio', description: 'Chứng chỉ chuẩn bị cho từng học viên tốt nghiệp.', relativeDaysStart: -12, relativeDaysDue: -5, priority: 'medium', order: 3 },

            { id: 'sh2', parentId: null, name: '2. Gửi thiệp mời & Chuẩn bị sân khấu', description: 'Mời phụ huynh tham dự ngày hội showcase của con.', relativeDaysStart: -10, relativeDaysDue: -1, priority: 'high', order: 4 },
            { id: 'sh2-1', parentId: 'sh2', name: 'Gửi thiệp mời điện tử trang trọng đến Phụ huynh', description: 'Gửi qua hệ thống Zalo ZNS và thông báo lớp.', relativeDaysStart: -10, relativeDaysDue: -4, priority: 'high', order: 5 },
            { id: 'sh2-2', parentId: 'sh2', name: 'Bố trí khu vực triển lãm từng nhóm & Bàn ban giám khảo', description: 'Bảng tên nhóm, poster giới thiệu dự án robot.', relativeDaysStart: -2, relativeDaysDue: -1, priority: 'medium', order: 6 },

            { id: 'sh3', parentId: null, name: '3. Ngày hội Showcase & Trao chứng chỉ', description: 'Học sinh thuyết trình dự án, phụ huynh trải nghiệm và vinh danh.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'urgent', order: 7 },
            { id: 'sh3-1', parentId: 'sh3', name: 'Học sinh thuyết trình & Trình diễn robot', description: 'Phụ huynh và ban giám khảo chấm điểm/đặt câu hỏi.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'urgent', order: 8 },
            { id: 'sh3-2', parentId: 'sh3', name: 'Lễ Vinh danh & Trao chứng nhận tốt nghiệp khóa học', description: 'Chụp hình kỷ niệm từng học sinh cùng bố mẹ.', relativeDaysStart: 0, relativeDaysDue: 0, priority: 'high', order: 9 },

            { id: 'sh4', parentId: null, name: '4. Cập nhật E-Portfolio & Lưu trữ', description: 'Đưa sản phẩm và chứng nhận lên hồ sơ điện tử học viên.', relativeDaysStart: 1, relativeDaysDue: 5, priority: 'high', order: 10 },
            { id: 'sh4-1', parentId: 'sh4', name: 'Cập nhật điểm & Hình ảnh vào trang E-Portfolio học sinh', description: 'Hồ sơ năng lực học tập trên hệ thống.', relativeDaysStart: 1, relativeDaysDue: 3, priority: 'high', order: 11 },
            { id: 'sh4-2', parentId: 'sh4', name: 'Gửi link Google Drive hình ảnh buổi lễ cho phụ huynh', description: 'Chia sẻ kỷ niệm đẹp cùng trung tâm.', relativeDaysStart: 1, relativeDaysDue: 3, priority: 'medium', order: 12 },
        ],
        budgetItems: [
            { id: 'sb1', name: 'In chứng nhận, bìa bằng & Huy hiệu danh dự', category: 'prizes', defaultEstimatedCost: 1500000, note: 'Cho 25 học sinh tốt nghiệp' },
            { id: 'sb2', name: 'Backdrop sân khấu & Trang trí sảnh triển lãm', category: 'marketing', defaultEstimatedCost: 1200000, note: 'Khung backdrop chụp ảnh' },
            { id: 'sb3', name: 'Teabreak tiệc ngọt bế giảng', category: 'catering', defaultEstimatedCost: 1000000, note: 'Bánh ngọt, trà đào, hoa quả' },
        ],
    },
];


export const MOCK_EVENTS = [
    {
        _id: 'evt-2026-001',
        id: 'evt-2026-001',
        title: 'Cuộc Thi Robotics Sáng Tạo AI Robotic Champion 2026',
        description: 'Giải đấu lập trình và điều khiển robot sa bàn quy mô 200 học sinh các trường tiểu học & THCS trên địa bàn.',
        type: 'competition',
        status: 'happening',
        location: 'Hội trường A - Đại học Khoa học Tự nhiên',
        startDate: '2026-10-15T07:30:00.000Z',
        endDate: '2026-10-15T17:30:00.000Z',
        banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
        tags: ['Robotics', 'Giải Đấu', 'Trường Học'],
        lead: 'u-1',
        shareToken: 'share-air-champion-2026',
        isShared: true,

        // 1. Stations (Trạm / Khu vực & Ma trận kịch bản)
        stations: [
            {
                id: 'st-1',
                name: 'Khu Vực Đón Tiếp & Check-in',
                area: 'Sảnh chính',
                description: 'Bàn tiếp đón, cấp thẻ đeo số báo danh, phát áo đấu và quà tặng sự kiện.',
                lead: 'u-3',
                assistingUnits: [
                    { id: 'unit-1', unitName: 'Ban Lễ Tân', leadPerson: 'u-3', notes: 'Phụ trách cấp thẻ & tài liệu' },
                    { id: 'unit-2', unitName: 'Ban Hậu Cần', leadPerson: 'u-6', notes: 'Phát áo & nước uống' },
                ],
            },
            {
                id: 'st-2',
                name: 'Sa Bàn Thi Đấu Robot Sumo',
                area: 'Sân thi đấu A',
                description: 'Khu vực 4 sân thi đấu robot đẩy gạt Sumo tự động và điều khiển Bluetooth.',
                lead: 'u-2',
                assistingUnits: [
                    { id: 'unit-3', unitName: 'Tổ Trọng Tài', leadPerson: 'u-2', notes: 'Bấm giờ & tính điểm' },
                    { id: 'unit-4', unitName: 'Tổ Kỹ Thuật', leadPerson: 'u-5', notes: 'Kiểm tra pin & kết nối robot' },
                ],
            },
            {
                id: 'st-3',
                name: 'Sa Bàn Dò Line & Vượt Chướng Ngại Vật',
                area: 'Sân thi đấu B',
                description: 'Sân đua line tốc độ cao kết hợp cánh tay gắp vật phẩm.',
                lead: 'u-5',
                assistingUnits: [
                    { id: 'unit-5', unitName: 'Tổ Kỹ Thuật Phần Cứng', leadPerson: 'u-5', notes: 'Setup sa bàn & cảm biến' },
                ],
            },
            {
                id: 'st-4',
                name: 'Khu Vực Bế Mạc & Trao Giải',
                area: 'Sân khấu trung tâm',
                description: 'Sân khấu chính với màn hình LED, bục trao cúp cờ lưu niệm và giao lưu.',
                lead: 'u-4',
                assistingUnits: [
                    { id: 'unit-6', unitName: 'Ban Sự Kiện & MC', leadPerson: 'u-4', notes: 'Kịch bản trao thưởng & MC' },
                ],
            },
        ],

        // Matrix Scenarios
        scenarios: [
            {
                id: 'sc-1',
                timeSlot: '07:30 - 08:30',
                name: 'Giai đoạn 1: Đón tiếp học sinh & Khởi động',
                description: 'Các đội thi tập trung, điểm danh và vào khu vực kỹ thuật thử sân.',
                order: 1,
                details: {
                    'st-1': { content: 'Check-in phát thẻ đeo, hướng dẫn học sinh vào bàn kỹ thuật.', status: 'completed' },
                    'st-2': { content: 'Mở sân cho các đội làm quen robot & test cảm biến.', status: 'completed' },
                    'st-3': { content: 'Hiệu chuẩn ánh sáng cảm biến dò đường.', status: 'completed' },
                    'st-4': { content: 'Kiểm tra âm thanh, micro và slide trình chiếu khai mạc.', status: 'completed' },
                },
            },
            {
                id: 'sc-2',
                timeSlot: '08:30 - 11:30',
                name: 'Giai đoạn 2: Khai mạc & Vòng Bảng Thi Đấu',
                description: 'Thi đấu đồng thời trên cả 2 cụm sa bàn A và B.',
                order: 2,
                details: {
                    'st-1': { content: 'Tiếp nhận phụ huynh và khách mời VIP tham quan.', status: 'in_progress' },
                    'st-2': { content: 'Thi đấu 16 trận vòng loại bảng Sumo Robotics.', status: 'in_progress' },
                    'st-3': { content: 'Thi đấu tính điểm vòng 1 & 2 Dò line tốc độ.', status: 'in_progress' },
                    'st-4': { content: 'MC bình luận trực tiếp trận đấu, cập nhật bảng điểm.', status: 'in_progress' },
                },
            },
            {
                id: 'sc-3',
                timeSlot: '14:00 - 16:30',
                name: 'Giai đoạn 3: Vòng Chung Kết & Bế Mạc Trao Giải',
                description: 'Trận chung kết kịch tính và trao cúp vô địch.',
                order: 3,
                details: {
                    'st-1': { content: 'Chuẩn bị quà lưu niệm cho tất cả học sinh tham dự.', status: 'pending' },
                    'st-2': { content: 'Thi đấu trận Chung kết Robot Sumo.', status: 'pending' },
                    'st-3': { content: 'Chung kết tính giờ siêu tốc.', status: 'pending' },
                    'st-4': { content: 'Công bố kết quả, trao Cúp, Bằng khen & Chụp ảnh lưu niệm.', status: 'pending' },
                },
            },
        ],

        // 2. Roadmap (Lộ trình chuẩn bị)
        roadmap: [
            { id: 'rm-1', name: 'Lập kế hoạch & Dự toán sự kiện', priority: 'high', startDate: '2026-09-01', dueDate: '2026-09-10', completed: true, parentId: null, order: 1, assignee: 'u-1' },
            { id: 'rm-2', name: 'Thuê địa điểm & Hội trường thi đấu', priority: 'high', startDate: '2026-09-11', dueDate: '2026-09-20', completed: true, parentId: null, order: 2, assignee: 'u-6' },
            { id: 'rm-3', name: 'Thiết kế Backdrop, Áo đấu & Cúp lưu niệm', priority: 'medium', startDate: '2026-09-15', dueDate: '2026-09-25', completed: true, parentId: null, order: 3, assignee: 'u-4' },
            { id: 'rm-4', name: 'Lắp ráp & Thử nghiệm 10 bộ Sa bàn chuẩn', priority: 'high', startDate: '2026-09-20', dueDate: '2026-10-05', completed: true, parentId: null, order: 4, assignee: 'u-2' },
            { id: 'rm-5', name: 'Mở cổng đăng ký & Tiếp nhận danh sách thí sinh', priority: 'high', startDate: '2026-09-25', dueDate: '2026-10-10', completed: true, parentId: null, order: 5, assignee: 'u-3' },
            { id: 'rm-6', name: 'Tập huấn Trọng tài & Đội hỗ trợ kỹ thuật', priority: 'medium', startDate: '2026-10-08', dueDate: '2026-10-12', completed: false, parentId: null, order: 6, assignee: 'u-2' },
            { id: 'rm-7', name: 'Setup sân bãi & Tổng duyệt kịch bản', priority: 'high', startDate: '2026-10-14', dueDate: '2026-10-14', completed: false, parentId: null, order: 7, assignee: 'u-1' },
            { id: 'rm-8', name: 'Tổ chức ngày thi đấu chính thức', priority: 'high', startDate: '2026-10-15', dueDate: '2026-10-15', completed: false, parentId: null, order: 8, assignee: 'u-1' },
        ],

        // 3. Staff & Members
        members: [
            { id: 'm-1', name: 'Huỳnh Trần Hữu Nhật', email: 'nhat.huynh@airobot.edu.vn', phone: '0901234567', role: 'Trưởng Ban Tổ Chức', station: 'Chung / Toàn sự kiện', userRef: 'u-1', status: 'confirmed' },
            { id: 'm-2', name: 'Nguyễn Văn Minh', email: 'minh.nguyen@airobot.edu.vn', phone: '0912345678', role: 'Trưởng Ban Kỹ Thuật', station: 'Sa Bàn Thi Đấu Robot Sumo', userRef: 'u-2', status: 'confirmed' },
            { id: 'm-3', name: 'Trần Thị Mai', email: 'mai.tran@airobot.edu.vn', phone: '0923456789', role: 'Phụ trách Đón tiếp & Học sinh', station: 'Khu Vực Đón Tiếp & Check-in', userRef: 'u-3', status: 'confirmed' },
            { id: 'm-4', name: 'Lê Hoàng Long', email: 'long.le@airobot.edu.vn', phone: '0934567890', role: 'Điều phối Sân khấu & Media', station: 'Khu Vực Bế Mạc & Trao Giải', userRef: 'u-4', status: 'confirmed' },
            { id: 'm-5', name: 'Phạm Đức Anh', email: 'anh.pham@airobot.edu.vn', phone: '0945678901', role: 'Trọng tài Sa bàn', station: 'Sa Bàn Dò Line & Vượt Chướng Ngại Vật', userRef: 'u-5', status: 'confirmed' },
            { id: 'm-6', name: 'Võ Thị Thanh', email: 'thanh.vo@airobot.edu.vn', phone: '0956789012', role: 'Thủ quỹ & Hậu cần', station: 'Chung / Toàn sự kiện', userRef: 'u-6', status: 'confirmed' },
        ],

        // 4. Equipment Checklist
        equipmentCategories: [
            { id: 'cat-sumo', key: 'cat-sumo', label: 'Robot Sumo & Phụ kiện', color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800' },
            { id: 'cat-trophy', key: 'cat-trophy', label: 'Cúp & Huy chương', color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' },
        ],
        equipmentChecklist: [
            { id: 'eq-1', name: 'Mô hình Sa bàn Sumo Gỗ chuẩn 1.2m x 1.2m', category: 'cat-sumo', quantity: 4, unit: 'Cái', assignedStation: 'Sa Bàn Thi Đấu Robot Sumo', assigneeName: 'Nguyễn Văn Minh', isPacked: true, isReturned: false, condition: 'Tốt', notes: 'Có kèm viền gỗ bảo vệ xung quanh' },
            { id: 'eq-2', name: 'Robot Sumo Bluetooth AI-Bot Pro', category: 'cat-sumo', quantity: 12, unit: 'Con', assignedStation: 'Sa Bàn Thi Đấu Robot Sumo', assigneeName: 'Phạm Đức Anh', isPacked: true, isReturned: false, condition: 'Tốt', notes: 'Đã sạc đầy 100% pin Lipo' },
            { id: 'eq-3', name: 'Bộ sạc đa năng 8 cổng & 20 viên Pin 18650', category: 'electronics', quantity: 4, unit: 'Bộ', assignedStation: 'Sa Bàn Thi Đấu Robot Sumo', assigneeName: 'Phạm Đức Anh', isPacked: true, isReturned: false, condition: 'Tốt', notes: 'Mang theo ổ cắm nối dài 10m' },
            { id: 'eq-4', name: 'Laptop Trọng Tài cài đặt phần mềm tính điểm', category: 'laptop_screen', quantity: 3, unit: 'Cái', assignedStation: 'Sa Bàn Thi Đấu Robot Sumo', assigneeName: 'Nguyễn Văn Minh', isPacked: true, isReturned: false, condition: 'Tốt', notes: 'Có sẵn file Excel tính điểm tự động' },
            { id: 'eq-5', name: 'Bộ Cúp Vô Địch, Nhì, Ba & 100 Huy chương', category: 'cat-trophy', quantity: 1, unit: 'Thùng', assignedStation: 'Khu Vực Bế Mạc & Trao Giải', assigneeName: 'Lê Hoàng Long', isPacked: true, isReturned: false, condition: 'Tốt', notes: 'Kiểm tra kỹ nắp cúp và ruy băng huy chương' },
            { id: 'eq-6', name: 'Thùng Băng keo, Kéo, Dây rút & Đồng hồ VOM', category: 'tools', quantity: 2, unit: 'Hộp', assignedStation: 'Sa Bàn Dò Line & Vượt Chướng Ngại Vật', assigneeName: 'Phạm Đức Anh', isPacked: true, isReturned: false, condition: 'Tốt', notes: 'Dụng cụ sửa chữa nhanh' },
        ],

        // 5. Budget & Finance
        budget: {
            currency: 'VND',
            totalEstimated: 25000000,
            totalActual: 23850000,
            items: [
                { id: 'bg-1', name: 'Thuê Hội trường & Âm thanh ánh sáng', category: 'Địa điểm', type: 'expense', estimatedCost: 10000000, actualCost: 10000000, status: 'paid', paidBy: 'Võ Thị Thanh', note: 'Đã thanh toán cọc 100%', proofLink: 'https://drive.google.com/drive/folders/air_budget_hall' },
                { id: 'bg-2', name: 'Đặt in Backdrop, Banner & Standee đón khách', category: 'Truyền thông', type: 'expense', estimatedCost: 3500000, actualCost: 3200000, status: 'paid', paidBy: 'Lê Hoàng Long', note: 'Đã nhận bàn giao và dán tại sảnh', proofLink: 'https://drive.google.com/drive/folders/air_budget_print' },
                { id: 'bg-3', name: 'Sản xuất Cúp Vô địch mạ vàng & 100 Huy chương kim loại', category: 'Giải thưởng', type: 'expense', estimatedCost: 4500000, actualCost: 4500000, status: 'paid', paidBy: 'Huỳnh Trần Hữu Nhật', note: 'Đã kiểm tra chất lượng khắc tên giải', proofLink: 'https://drive.google.com/drive/folders/air_budget_trophy' },
                { id: 'bg-4', name: 'Nước uống, bánh ngọt Teabreak cho học sinh & phụ huynh', category: 'Hậu cần', type: 'expense', estimatedCost: 4000000, actualCost: 3650000, status: 'paid', paidBy: 'Võ Thị Thanh', note: 'Hóa đơn đỏ Siêu thị Mega Market', proofLink: 'https://drive.google.com/drive/folders/air_budget_teabreak' },
                { id: 'bg-5', name: 'Chi phí dự phòng sửa chữa kỹ thuật phát sinh', category: 'Kỹ thuật', type: 'expense', estimatedCost: 3000000, actualCost: 2500000, status: 'paid', paidBy: 'Nguyễn Văn Minh', note: 'Mua bổ sung 4 bộ nguồn 12V 5A', proofLink: 'https://drive.google.com/drive/folders/air_budget_tech' },
            ],
        },

        // 6. Media Gallery
        media: [
            { id: 'med-1', title: 'Ảnh chụp toàn cảnh hội trường khai mạc', type: 'image', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', uploadedAt: '2026-10-15T09:00:00.000Z', uploader: 'Lê Hoàng Long', size: '4.2 MB', driveId: '1g-photo-001' },
            { id: 'med-2', title: 'Video clip các pha đẩy gạt kịch tính Robot Sumo', type: 'video', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80', uploadedAt: '2026-10-15T11:00:00.000Z', uploader: 'Lê Hoàng Long', size: '85.6 MB', driveId: '1g-video-002' },
            { id: 'med-3', title: 'Ảnh các thí sinh xuất sắc nhận Cúp vàng', type: 'image', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', uploadedAt: '2026-10-15T16:45:00.000Z', uploader: 'Lê Hoàng Long', size: '5.8 MB', driveId: '1g-photo-003' },
        ],

        // 7. Retrospective
        retro: {
            whatWentWell: [
                'Học sinh tham gia hào hứng, tinh thần đồng đội rất cao.',
                'Hệ thống sa bàn và robot thi đấu hoạt động ổn định, không bị nghẽn Bluetooth.',
                'Ban Hậu cần phục vụ nước uống và bánh ngọt chu đáo, nhận được nhiều lời khen từ phụ huynh.',
            ],
            whatCouldBeImproved: [
                'Thời gian check-in đầu giờ sáng hơi đông, cần bố trí thêm 1 bàn tiếp đón.',
                'Nên có màn hình phụ hiển thị bảng xếp hạng trực tiếp cho phụ huynh xem từ xa.',
            ],
            actionItems: [
                { id: 'act-1', task: 'Bổ sung thêm 2 bộ máy quét QR Code cho khâu check-in giải sau.', assignee: 'Trần Thị Mai', deadline: '2026-11-01', completed: false },
                { id: 'act-2', task: 'Phát triển trang web livestream bảng điểm real-time.', assignee: 'Huỳnh Trần Hữu Nhật', deadline: '2026-11-15', completed: false },
            ],
            kudos: [
                { id: 'kd-1', from: 'Huỳnh Trần Hữu Nhật', to: 'Nguyễn Văn Minh', message: 'Cảm ơn anh Minh và team Kỹ thuật đã hỗ trợ sửa robot cực nhanh cho các bé!' },
                { id: 'kd-2', from: 'Lê Hoàng Long', to: 'Võ Thị Thanh', message: 'Hậu cần quá xuất sắc và chu đáo, mọi người không ai bị đói hay mệt!' },
            ],
        },

        // 8. Zalo Config
        zaloConfig: {
            enabled: true,
            oaId: '2847192847192',
            broadcastHistory: [
                { id: 'z-1', sentAt: '2026-10-14T19:00:00.000Z', message: 'Nhắc nhở: Ngày mai 07:30 bắt đầu Cuộc thi Robotics tại Hội trường A. Các em nhớ mang theo áo đấu!', recipientsCount: 185, status: 'success' },
            ],
        },

        // 9. Guide & Checklists
        guide: {
            sections: [
                {
                    id: 'g-1',
                    title: '1. Quy trình đón tiếp & Check-in',
                    content: 'Kiểm tra tên trong danh sách, phát vòng tay màu theo bảng đấu, hướng dẫn thí sinh đến khu vực kỹ thuật kiểm tra robot trước 08:15.',
                },
                {
                    id: 'g-2',
                    title: '2. Quy định an toàn kỹ thuật',
                    content: 'Tuyệt đối không cắm sạc pin trực tiếp dưới sàn ẩm ướt; Luôn có bình cứu hỏa mini tại khu vực bàn kỹ thuật sạc pin.',
                },
            ],
        },
    },

    {
        _id: 'evt-2026-002',
        id: 'evt-2026-002',
        title: 'Hội Thảo Công Nghệ AI & Trí Tuệ Nhân Tạo Tương Lai',
        description: 'Hội thảo chuyên đề công nghệ giáo dục STEM và giải pháp ứng dụng AI Robotic trong giảng dạy.',
        type: 'workshop',
        status: 'upcoming',
        location: 'Trung tâm Hội nghị Riverside Palace, Quận 4',
        startDate: '2026-11-20T08:30:00.000Z',
        endDate: '2026-11-20T12:00:00.000Z',
        banner: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
        tags: ['AI & IoT', 'Workshop', 'Trường Học'],
        lead: 'u-1',
        shareToken: 'share-ai-workshop-2026',
        isShared: true,
        stations: [
            { id: 'st-w1', name: 'Sảnh Check-in & Teabreak', area: 'Khu vực tiền sảnh', description: 'Đón tiếp đại biểu và chuyên gia', lead: 'u-3' },
            { id: 'st-w2', name: 'Hội trường Trình bày & Tọa đàm', area: 'Hội trường chính', description: 'Khu vực diễn giả trình bày', lead: 'u-1' },
            { id: 'st-w3', name: 'Khu vực Trưng bày Sản phẩm AI Robotic', area: 'Khu vực Demo', description: 'Trưng bày các mô hình robot AI', lead: 'u-2' },
        ],
        scenarios: [],
        roadmap: [
            { id: 'rm-w1', name: 'Mời các diễn giả & Chuyên gia đầu ngành', priority: 'high', startDate: '2026-10-01', dueDate: '2026-10-25', completed: true, parentId: null, order: 1, assignee: 'u-1' },
            { id: 'rm-w2', name: 'Hoàn thiện slide bài giảng & Tài liệu hội thảo', priority: 'high', startDate: '2026-10-20', dueDate: '2026-11-10', completed: false, parentId: null, order: 2, assignee: 'u-4' },
        ],
        members: [
            { id: 'mw-1', name: 'Huỳnh Trần Hữu Nhật', email: 'nhat.huynh@airobot.edu.vn', phone: '0901234567', role: 'Chủ trì Tọa đàm', station: 'Hội trường Trình bày & Tọa đàm', userRef: 'u-1', status: 'confirmed' },
        ],
        equipmentChecklist: [],
        budget: { totalEstimated: 15000000, totalActual: 5000000, items: [] },
        media: [],
        retro: { whatWentWell: [], whatCouldBeImproved: [], actionItems: [], kudos: [] },
        zaloConfig: { enabled: true, broadcastHistory: [] },
        guide: { sections: [] },
    },

    {
        _id: 'evt-2026-003',
        id: 'evt-2026-003',
        title: 'Ngày Hội Khám Phá Khoa Học STEM & Lắp Ráp Không Gian',
        description: 'Ngày hội trải nghiệm mô hình tên lửa nước, robot khám phá sao Hỏa dành cho các bạn nhỏ.',
        type: 'other',
        status: 'completed',
        location: 'Trường Tiểu học Nguyễn Bỉnh Khiêm, Quận 1',
        startDate: '2026-08-10T08:00:00.000Z',
        endDate: '2026-08-10T16:00:00.000Z',
        banner: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        tags: ['Robotics', 'Workshop'],
        lead: 'u-2',
        shareToken: 'share-stem-space-2026',
        isShared: true,
        stations: [],
        scenarios: [],
        roadmap: [],
        members: [],
        equipmentChecklist: [],
        budget: { totalEstimated: 12000000, totalActual: 11500000, items: [] },
        media: [],
        retro: { whatWentWell: ['Hoàn thành xuất sắc ngày hội!'], whatCouldBeImproved: [], actionItems: [], kudos: [] },
        zaloConfig: { enabled: false, broadcastHistory: [] },
        guide: { sections: [] },
    },
];
