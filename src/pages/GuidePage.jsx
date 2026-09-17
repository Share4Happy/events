import React from 'react';
import { Link } from 'react-router-dom';
import EventGuideView from '@/components/tabs/guide/EventGuideView';
import { IconArrowLeft, IconBookOpen } from '@/components/icons';

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-[var(--bg-secondary)] flex flex-col justify-between">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)] px-4 sm:px-6 lg:px-8 xl:px-10 py-3.5 w-full">
                <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/events"
                            className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors"
                            title="Quay lại danh sách sự kiện"
                        >
                            <IconArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <h1 className="text-base sm:text-lg font-black text-[var(--text-primary)] leading-tight m-0 flex items-center gap-2">
                                <IconBookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <span>Cẩm Nang Hướng Dẫn Tổ Chức Sự Kiện & Ngày Hội Robotics</span>
                            </h1>
                            <span className="text-[11px] text-[var(--text-secondary)] font-medium">
                                Quy trình tiêu chuẩn, cẩm nang vai trò, checklist và hướng dẫn sử dụng tính năng hệ thống
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 flex-1 flex flex-col">
                <EventGuideView />
            </main>
        </div>
    );
}
