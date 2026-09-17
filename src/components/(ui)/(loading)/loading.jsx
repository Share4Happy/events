import React from 'react';

export default function Loading({ text = 'Đang tải dữ liệu...' }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-8 gap-3">
            <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">{text}</span>
        </div>
    );
}
