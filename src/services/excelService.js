import * as XLSX from 'xlsx';

// 1. Template Definitions
export const EQUIPMENT_TEMPLATE_HEADERS = [
    'STT',
    'Tên thiết bị / linh kiện (*)',
    'Số lượng (*)',
    'Đơn vị',
    'Phân loại',
    'Trạm phụ trách',
    'Người phụ trách',
    'Ghi chú',
];

export const EQUIPMENT_SAMPLE_DATA = [
    [1, 'Mô hình Sa bàn Sumo Gỗ chuẩn 1.2m x 1.2m', 4, 'Cái', 'Robot Sumo & Phụ kiện', 'Sa Bàn Thi Đấu Robot Sumo', 'Nguyễn Văn Minh', 'Kèm viền gỗ bảo vệ'],
    [2, 'Robot Sumo Bluetooth AI-Bot Pro', 12, 'Con', 'Robot Sumo & Phụ kiện', 'Sa Bàn Thi Đấu Robot Sumo', 'Phạm Đức Anh', 'Đã sạc đầy 100% pin Lipo'],
    [3, 'Bộ sạc đa năng 8 cổng & 20 viên Pin 18650', 4, 'Bộ', 'Điện & Điện tử', 'Sa Bàn Thi Đấu Robot Sumo', 'Phạm Đức Anh', 'Mang theo ổ cắm nối dài 10m'],
    [4, 'Laptop Trọng Tài cài đặt phần mềm tính điểm', 3, 'Cái', 'Máy tính & Màn hình', 'Sa Bàn Thi Đấu Robot Sumo', 'Nguyễn Văn Minh', 'Có sẵn file Excel tính điểm tự động'],
    [5, 'Bộ Cúp Vô Địch, Nhì, Ba & 100 Huy chương', 1, 'Thùng', 'Cúp & Huy chương', 'Khu Vực Bế Mạc & Trao Giải', 'Lê Hoàng Long', 'Kiểm tra kỹ nắp cúp và ruy băng'],
];

export const MEMBERS_TEMPLATE_HEADERS = [
    'STT',
    'Họ và tên (*)',
    'Vai trò (*)',
    'Số điện thoại',
    'Email',
    'Đơn vị / Trường',
    'Ghi chú',
];

export const MEMBERS_SAMPLE_DATA = [
    [1, 'Huỳnh Trần Hữu Nhật', 'Trưởng ban tổ chức', '0901234567', 'nhat.huynh@airobot.edu.vn', 'AI Robotic', 'Điều phối toàn bộ sự kiện'],
    [2, 'Nguyễn Văn Minh', 'Trưởng Ban Kỹ Thuật', '0912345678', 'minh.nguyen@airobot.edu.vn', 'AI Robotic', 'Phụ trách sa bàn thi đấu & chấm điểm'],
    [3, 'Trần Thị Mai', 'Phụ trách Đón tiếp & Học sinh', '0923456789', 'mai.tran@airobot.edu.vn', 'AI Robotic', 'Bàn check-in & phát thẻ số báo danh'],
    [4, 'Lê Hoàng Long', 'Điều phối Sân khấu & Media', '0934567890', 'long.le@airobot.edu.vn', 'AI Robotic', 'Chụp ảnh & dẫn chương trình MC'],
    [5, 'Phạm Đức Anh', 'Trọng tài Sa bàn', '0945678901', 'anh.pham@airobot.edu.vn', 'AI Robotic', 'Bấm giờ & kiểm tra robot'],
];

export const excelService = {
    // --- DOWNLOAD TEMPLATES ---
    downloadEquipmentTemplate(filename = 'Mau_Import_Thiet_Bi.xlsx') {
        const wsData = [EQUIPMENT_TEMPLATE_HEADERS, ...EQUIPMENT_SAMPLE_DATA];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        // Set column widths
        ws['!cols'] = [
            { wch: 6 },  // STT
            { wch: 40 }, // Tên
            { wch: 12 }, // SL
            { wch: 10 }, // Đơn vị
            { wch: 24 }, // Phân loại
            { wch: 28 }, // Trạm
            { wch: 22 }, // Người phụ trách
            { wch: 35 }, // Ghi chú
        ];

        XLSX.utils.book_append_sheet(wb, ws, 'Danh_Sach_Thiet_Bi');
        XLSX.writeFile(wb, filename);
    },

    downloadMembersTemplate(filename = 'Mau_Import_Nhan_Su.xlsx') {
        const wsData = [MEMBERS_TEMPLATE_HEADERS, ...MEMBERS_SAMPLE_DATA];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        ws['!cols'] = [
            { wch: 6 },  // STT
            { wch: 28 }, // Họ tên
            { wch: 28 }, // Vai trò
            { wch: 16 }, // SĐT
            { wch: 28 }, // Email
            { wch: 20 }, // Đơn vị
            { wch: 35 }, // Ghi chú
        ];

        XLSX.utils.book_append_sheet(wb, ws, 'Danh_Sach_Thanh_Vien');
        XLSX.writeFile(wb, filename);
    },

    // --- PARSE UPLOADED FILES ---
    async parseEquipmentFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    if (!rows || rows.length < 2) {
                        return resolve([]);
                    }

                    // Look for header row
                    let headerRowIdx = 0;
                    for (let i = 0; i < Math.min(5, rows.length); i++) {
                        const r = rows[i];
                        if (r && r.some(c => typeof c === 'string' && (c.includes('Tên') || c.includes('thiết bị')))) {
                            headerRowIdx = i;
                            break;
                        }
                    }

                    const headers = rows[headerRowIdx].map(h => (h ? String(h).toLowerCase().trim() : ''));
                    const nameCol = headers.findIndex(h => h.includes('tên') || h.includes('name'));
                    const qtyCol = headers.findIndex(h => h.includes('số lượng') || h.includes('sl') || h.includes('qty') || h.includes('quantity'));
                    const unitCol = headers.findIndex(h => h.includes('đơn vị') || h.includes('unit'));
                    const catCol = headers.findIndex(h => h.includes('phân loại') || h.includes('loại') || h.includes('category'));
                    const stationCol = headers.findIndex(h => h.includes('trạm') || h.includes('khu vực') || h.includes('station'));
                    const assigneeCol = headers.findIndex(h => h.includes('người') || h.includes('phụ trách') || h.includes('assignee'));
                    const notesCol = headers.findIndex(h => h.includes('ghi chú') || h.includes('note'));

                    const result = [];
                    for (let i = headerRowIdx + 1; i < rows.length; i++) {
                        const row = rows[i];
                        if (!row || row.length === 0) continue;

                        const name = nameCol >= 0 ? row[nameCol] : row[1];
                        if (!name || String(name).trim() === '') continue;

                        const qty = qtyCol >= 0 ? Number(row[qtyCol]) || 1 : 1;
                        const unit = unitCol >= 0 && row[unitCol] ? String(row[unitCol]).trim() : 'Bộ';
                        const cat = catCol >= 0 && row[catCol] ? String(row[catCol]).trim() : 'tools';
                        const station = stationCol >= 0 && row[stationCol] ? String(row[stationCol]).trim() : '';
                        const assignee = assigneeCol >= 0 && row[assigneeCol] ? String(row[assigneeCol]).trim() : '';
                        const notes = notesCol >= 0 && row[notesCol] ? String(row[notesCol]).trim() : '';

                        result.push({
                            id: `eq-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
                            name: String(name).trim(),
                            quantity: qty,
                            unit,
                            category: cat,
                            assignedStation: station,
                            assigneeName: assignee,
                            isPacked: false,
                            isReturned: false,
                            condition: 'Tốt',
                            notes,
                        });
                    }

                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            };

            reader.onerror = (err) => reject(err);
            reader.readAsArrayBuffer(file);
        });
    },

    async parseMembersFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    if (!rows || rows.length < 2) {
                        return resolve([]);
                    }

                    let headerRowIdx = 0;
                    for (let i = 0; i < Math.min(5, rows.length); i++) {
                        const r = rows[i];
                        if (r && r.some(c => typeof c === 'string' && (c.includes('tên') || c.includes('họ') || c.includes('name')))) {
                            headerRowIdx = i;
                            break;
                        }
                    }

                    const headers = rows[headerRowIdx].map(h => (h ? String(h).toLowerCase().trim() : ''));
                    const nameCol = headers.findIndex(h => h.includes('họ') || h.includes('tên') || h.includes('name'));
                    const roleCol = headers.findIndex(h => h.includes('vai trò') || h.includes('role') || h.includes('chức vụ'));
                    const phoneCol = headers.findIndex(h => h.includes('thoại') || h.includes('sđt') || h.includes('phone') || h.includes('tel'));
                    const emailCol = headers.findIndex(h => h.includes('email') || h.includes('thư'));
                    const orgCol = headers.findIndex(h => h.includes('đơn vị') || h.includes('trường') || h.includes('tổ chức') || h.includes('org'));
                    const notesCol = headers.findIndex(h => h.includes('ghi chú') || h.includes('note'));

                    const result = [];
                    for (let i = headerRowIdx + 1; i < rows.length; i++) {
                        const row = rows[i];
                        if (!row || row.length === 0) continue;

                        const name = nameCol >= 0 ? row[nameCol] : row[1];
                        if (!name || String(name).trim() === '') continue;

                        const role = roleCol >= 0 && row[roleCol] ? String(row[roleCol]).trim() : 'Thành viên';
                        const phone = phoneCol >= 0 && row[phoneCol] ? String(row[phoneCol]).trim() : '';
                        const email = emailCol >= 0 && row[emailCol] ? String(row[emailCol]).trim() : '';
                        const organization = orgCol >= 0 && row[orgCol] ? String(row[orgCol]).trim() : '';
                        const notes = notesCol >= 0 && row[notesCol] ? String(row[notesCol]).trim() : '';

                        result.push({
                            id: `mem-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
                            name: String(name).trim(),
                            role,
                            phone,
                            email,
                            organization,
                            notes,
                            checkInStatus: false,
                            isExternal: true,
                        });
                    }

                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            };

            reader.onerror = (err) => reject(err);
            reader.readAsArrayBuffer(file);
        });
    },

    // --- EXPORT TO EXCEL ---
    exportEquipmentToExcel(items, eventTitle = 'Sự kiện') {
        const headers = [
            'STT',
            'Tên thiết bị / linh kiện',
            'Phân loại',
            'Số lượng',
            'Đơn vị',
            'Trạm phụ trách',
            'Người phụ trách',
            'Đã mang đi (Đi)',
            'Đã thu hồi (Về)',
            'Tình trạng',
            'Ghi chú',
        ];

        const rows = (items || []).map((it, idx) => [
            idx + 1,
            it.name || '',
            it.category || '',
            it.quantity || 1,
            it.unit || 'Bộ',
            it.assignedStation || '',
            it.assigneeName || '',
            it.isPacked ? 'ĐÃ ĐÓNG GÓI' : 'CHƯA',
            it.isReturned ? 'ĐÃ THU HỒI' : 'CHƯA',
            it.condition || 'Tốt',
            it.notes || '',
        ]);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        ws['!cols'] = [
            { wch: 6 },
            { wch: 38 },
            { wch: 22 },
            { wch: 10 },
            { wch: 10 },
            { wch: 28 },
            { wch: 22 },
            { wch: 16 },
            { wch: 16 },
            { wch: 14 },
            { wch: 35 },
        ];

        XLSX.utils.book_append_sheet(wb, ws, 'Checklist_Thiet_Bi');
        XLSX.writeFile(wb, `Checklist_Thiet_Bi_${eventTitle.replace(/[/\\?%*:|"<>]/g, '_')}.xlsx`);
    },

    exportMembersToExcel(members, eventTitle = 'Sự kiện') {
        const headers = [
            'STT',
            'Họ và tên',
            'Vai trò',
            'Số điện thoại',
            'Email',
            'Đơn vị / Tổ chức',
            'Điểm danh (D-Day)',
            'Thời gian điểm danh',
            'Ghi chú',
        ];

        const rows = (members || []).map((m, idx) => [
            idx + 1,
            m.name || '',
            m.role || 'Thành viên',
            m.phone || '',
            m.email || '',
            m.organization || '',
            m.checkInStatus ? 'ĐÃ ĐIỂM DANH' : 'CHƯA',
            m.checkInTime ? new Date(m.checkInTime).toLocaleString('vi-VN') : '',
            m.notes || '',
        ]);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        ws['!cols'] = [
            { wch: 6 },
            { wch: 28 },
            { wch: 25 },
            { wch: 16 },
            { wch: 28 },
            { wch: 22 },
            { wch: 18 },
            { wch: 22 },
            { wch: 35 },
        ];

        XLSX.utils.book_append_sheet(wb, ws, 'Danh_Sach_Nhan_Su');
        XLSX.writeFile(wb, `Danh_Sach_Nhan_Su_${eventTitle.replace(/[/\\?%*:|"<>]/g, '_')}.xlsx`);
    },

    exportBudgetToExcel(budget, eventTitle = 'Sự kiện') {
        const headers = [
            'STT',
            'Hạng mục chi tiêu / Thu',
            'Phân loại',
            'Loại giao dịch',
            'Dự toán (VNĐ)',
            'Thực chi (VNĐ)',
            'Chênh lệch (VNĐ)',
            'Trạng thái',
            'Người thanh toán',
            'Ghi chú',
            'Link hóa đơn / chứng từ',
        ];

        const items = budget?.items || [];
        const rows = items.map((b, idx) => {
            const diff = (b.estimatedCost || 0) - (b.actualCost || 0);
            return [
                idx + 1,
                b.name || '',
                b.category || 'Khác',
                b.type === 'income' ? 'Thu' : 'Chi',
                b.estimatedCost || 0,
                b.actualCost || 0,
                diff,
                b.status === 'paid' ? 'Đã thanh toán' : b.status === 'pending' ? 'Chờ duyệt' : 'Dự toán',
                b.paidBy || '',
                b.note || '',
                b.proofLink || '',
            ];
        });

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        ws['!cols'] = [
            { wch: 6 },
            { wch: 35 },
            { wch: 18 },
            { wch: 14 },
            { wch: 16 },
            { wch: 16 },
            { wch: 16 },
            { wch: 16 },
            { wch: 22 },
            { wch: 30 },
            { wch: 35 },
        ];

        XLSX.utils.book_append_sheet(wb, ws, 'Ngan_Sach');
        XLSX.writeFile(wb, `Ngan_Sach_${eventTitle.replace(/[/\\?%*:|"<>]/g, '_')}.xlsx`);
    },
};
