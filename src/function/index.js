export function formatDate(date) {
    if (!date) return 'Thiếu thông tin';
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return 'Thiếu thông tin';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatCurrencyVN(number) {
    if (typeof number !== 'number' || isNaN(number)) {
        return '0 VNĐ';
    }
    const formattedNumber = number.toLocaleString('vi-VN');
    return `${formattedNumber} VNĐ`;
}

export function srcImage(id) {
    if (!id) return 'https://api.dicebear.com/7.x/avataaars/svg?seed=air';
    if (typeof id === 'string' && (id.startsWith('http://') || id.startsWith('https://') || id.startsWith('data:'))) {
        return id;
    }
    return `https://lh3.googleusercontent.com/d/${id}`;
}

export function formatTimeAgo(date) {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return '';
    const now = new Date();
    const diffMs = now - d;
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return 'Vừa xong';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} phút trước`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} giờ trước`;
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 30) return `${diffDay} ngày trước`;
    return formatDate(d);
}
