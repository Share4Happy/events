import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '@/components/list/EventCard';
import EventStatsOverview from '@/components/list/EventStatsOverview';
import CreateEventModal from '@/components/list/CreateEventModal';
import ManageTemplatesModal from '@/components/list/ManageTemplatesModal';
import DateInput from '@/components/(ui)/(input)/DateInput';
import Loading from '@/components/(ui)/(loading)/loading';
import {
    IconPlus,
    IconFileText,
    IconFilter,
    IconCalendar,
    IconBookOpen,
    IconSun,
    IconMoon,
} from '@/components/icons';
import { EVENT_TYPE_OPTIONS } from '@/components/common';
import EventChatBubble from '@/components/chat/EventChatBubble';
import { eventStorageService } from '@/services/eventStorageService';

export default function EventsListPage() {
    const [rawEvents, setRawEvents] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [tags, setTags] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isReloading, setIsReloading] = useState(false);
    const [canViewBudget, setCanViewBudget] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [search, setSearch] = useState('');
    const [type, setType] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statusTab, setStatusTab] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isManageTemplatesOpen, setIsManageTemplatesOpen] = useState(false);

    // Toggle Dark Mode
    const toggleDarkMode = () => {
        const next = !isDarkMode;
        setIsDarkMode(next);
        if (next) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const fetchTags = useCallback(async () => {
        try {
            const data = await eventStorageService.getTags();
            if (data.success) setTags(data.tags || []);
        } catch (err) {
            console.error('Error fetching event tags:', err);
        }
    }, []);

    const fetchInitialMeta = useCallback(async () => {
        try {
            const [dataTpl, dataUsers] = await Promise.all([
                eventStorageService.getTemplates(),
                eventStorageService.getUsers(),
            ]);
            if (dataTpl.success) setTemplates(dataTpl.templates || []);
            if (dataUsers.success) setUsers(dataUsers.users || []);
        } catch (err) {
            console.error('Error fetching event metadata:', err);
        }
    }, []);

    const fetchEvents = useCallback(async () => {
        setIsReloading(true);
        try {
            const data = await eventStorageService.getEvents();
            if (data.success) {
                setRawEvents(data.events || []);
                setCanViewBudget(!!data.canViewBudget);
            }
        } catch (err) {
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
            setIsReloading(false);
        }
    }, []);

    useEffect(() => {
        fetchInitialMeta();
        fetchTags();
        fetchEvents();
    }, [fetchInitialMeta, fetchTags, fetchEvents]);

    const handleEventCreated = () => {
        fetchEvents();
        fetchTags();
    };

    const statusCounts = useMemo(() => {
        const counts = {
            all: 0,
            upcoming: 0,
            happening: 0,
            completed: 0,
            cancelled: 0,
        };

        rawEvents.forEach((event) => {
            if (type !== 'all' && event.type !== type) return;
            if (selectedTag !== 'all') {
                if (!event.tags || !event.tags.includes(selectedTag)) return;
            }
            if (startDate && new Date(event.startDate) < new Date(startDate)) return;
            if (endDate && new Date(event.endDate) > new Date(endDate)) return;

            counts.all++;
            if (counts[event.status] !== undefined) {
                counts[event.status]++;
            }
        });

        return counts;
    }, [rawEvents, type, selectedTag, startDate, endDate]);

    const filteredEvents = useMemo(() => {
        return rawEvents.filter((event) => {
            if (search.trim()) {
                const query = search.toLowerCase().trim();
                const titleMatch = (event.title || '').toLowerCase().includes(query);
                const descMatch = (event.description || '').toLowerCase().includes(query);
                const locMatch = (event.location || '').toLowerCase().includes(query);
                if (!titleMatch && !descMatch && !locMatch) return false;
            }

            if (type !== 'all' && event.type !== type) return false;
            if (statusTab !== 'all' && event.status !== statusTab) return false;

            if (selectedTag !== 'all') {
                if (!event.tags || !event.tags.includes(selectedTag)) return false;
            }

            if (startDate) {
                const eventStart = new Date(event.startDate);
                const filterStart = new Date(startDate);
                if (eventStart < filterStart) return false;
            }

            if (endDate) {
                const eventEnd = new Date(event.endDate);
                const filterEnd = new Date(endDate);
                if (eventEnd > filterEnd) return false;
            }

            return true;
        });
    }, [rawEvents, search, type, statusTab, selectedTag, startDate, endDate]);

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (type !== 'all') count++;
        if (selectedTag !== 'all') count++;
        if (startDate) count++;
        if (endDate) count++;
        return count;
    }, [type, selectedTag, startDate, endDate]);

    const handleClearFilters = () => {
        setType('all');
        setSelectedTag('all');
        setStartDate('');
        setEndDate('');
        setSearch('');
    };

    return (
        <div className="min-h-screen bg-[var(--bg-secondary)] flex flex-col justify-between w-full">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-30 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)] px-4 sm:px-6 lg:px-8 xl:px-10 py-3.5 transition-colors w-full">
                <div className="w-full flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20">
                            AIR
                        </div>
                        <div>
                            <h1 className="text-base sm:text-lg font-black text-[var(--text-primary)] leading-tight m-0">
                                Quản Lý Sự Kiện & Giải Đấu
                            </h1>
                            <span className="text-[11px] text-[var(--text-secondary)] font-medium hidden sm:inline">
                                AI Robotic Event Management System (React Standalone)
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to="/guide"
                            className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5 transition-colors"
                        >
                            <IconBookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="hidden sm:inline">Cẩm nang</span>
                        </Link>

                        <button
                            type="button"
                            onClick={toggleDarkMode}
                            className="p-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] text-[var(--text-primary)] cursor-pointer transition-colors"
                            title="Bật/Tắt Giao diện Tối"
                        >
                            {isDarkMode ? <IconSun className="w-4 h-4 text-amber-400" /> : <IconMoon className="w-4 h-4 text-gray-600" />}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsManageTemplatesOpen(true)}
                            className="px-3.5 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] text-xs sm:text-sm font-semibold text-[var(--text-primary)] transition-all cursor-pointer flex items-center gap-1.5"
                        >
                            <IconFileText className="w-4 h-4 text-[var(--text-secondary)]" />
                            <span className="hidden sm:inline">Mẫu sự kiện</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsCreateOpen(true)}
                            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all border-none cursor-pointer flex items-center gap-1.5"
                        >
                            <IconPlus className="w-4 h-4" />
                            <span>Tạo sự kiện</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 flex-1 flex flex-col gap-6">
                {/* Stats Summary Cards */}
                <EventStatsOverview events={rawEvents} canViewBudget={canViewBudget} />

                {/* Search, Filter & Tabs Bar */}
                <div className="bg-[var(--bg-primary)] p-4 rounded-2xl border border-[var(--border-color)] shadow-xs flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                        {/* Status Tabs */}
                        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                            {[
                                { key: 'all', label: 'Tất cả' },
                                { key: 'happening', label: 'Đang diễn ra' },
                                { key: 'upcoming', label: 'Sắp diễn ra' },
                                { key: 'completed', label: 'Đã hoàn thành' },
                                { key: 'cancelled', label: 'Đã hủy' },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setStatusTab(tab.key)}
                                    className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border-none flex items-center gap-1.5 ${
                                        statusTab === tab.key
                                            ? 'bg-blue-600 text-white shadow-xs'
                                            : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                                        statusTab === tab.key ? 'bg-white/20 text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                                    }`}>
                                        {statusCounts[tab.key] || 0}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Search & Filter Toggle */}
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1 md:w-72">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Tìm theo tên sự kiện, địa điểm..."
                                    className="w-full pl-3.5 pr-8 py-2 text-xs sm:text-sm bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl focus:border-blue-500 focus:bg-[var(--bg-primary)] outline-none text-[var(--text-primary)] font-medium transition-all"
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className={`px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                                    showFilters || activeFilterCount > 0
                                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                                        : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
                                }`}
                            >
                                <IconFilter className="w-4 h-4" />
                                <span className="hidden sm:inline">Bộ lọc</span>
                                {activeFilterCount > 0 && (
                                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Expandable Advanced Filters */}
                    {showFilters && (
                        <div className="pt-3 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 animate-fadeIn">
                            {/* Type filter */}
                            <div>
                                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                                    Loại hình sự kiện
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-xs font-medium text-[var(--text-primary)] focus:border-blue-500 outline-none"
                                >
                                    <option value="all">Tất cả loại hình</option>
                                    {EVENT_TYPE_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Tag filter */}
                            <div>
                                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                                    Nhãn / Phân loại
                                </label>
                                <select
                                    value={selectedTag}
                                    onChange={(e) => setSelectedTag(e.target.value)}
                                    className="w-full px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-xs font-medium text-[var(--text-primary)] focus:border-blue-500 outline-none"
                                >
                                    <option value="all">Tất cả nhãn ({tags.length})</option>
                                    {tags.map((tg) => (
                                        <option key={tg._id || tg.name} value={tg.name}>
                                            {tg.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date range filters */}
                            <div>
                                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                                    Từ ngày
                                </label>
                                <DateInput
                                    value={startDate}
                                    onChange={(val) => setStartDate(val)}
                                    placeholder="Từ ngày..."
                                    className="w-full px-3 py-1.5 text-xs rounded-xl"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                                    Đến ngày
                                </label>
                                <DateInput
                                    value={endDate}
                                    onChange={(val) => setEndDate(val)}
                                    placeholder="Đến ngày..."
                                    className="w-full px-3 py-1.5 text-xs rounded-xl"
                                />
                            </div>

                            {activeFilterCount > 0 && (
                                <div className="sm:col-span-2 md:col-span-4 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleClearFilters}
                                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer border-none bg-transparent"
                                    >
                                        ✕ Xóa tất cả bộ lọc
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Events Cards Grid */}
                {loading ? (
                    <Loading text="Đang tải danh sách sự kiện..." />
                ) : filteredEvents.length === 0 ? (
                    <div className="py-16 text-center flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--bg-primary)] p-8">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                            <IconCalendar className="w-7 h-7" />
                        </div>
                        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
                            {search || activeFilterCount > 0 || statusTab !== 'all'
                                ? 'Không tìm thấy sự kiện phù hợp'
                                : 'Chưa có sự kiện nào trong hệ thống'}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] max-w-md mb-4">
                            {search || activeFilterCount > 0 || statusTab !== 'all'
                                ? 'Hãy thử thay đổi từ khóa tìm kiếm hoặc bỏ các bộ lọc ngày, nhãn.'
                                : 'Hãy bắt đầu tạo sự kiện đầu tiên để quản lý ma trận trạm, kịch bản, nhân sự và thiết bị.'}
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsCreateOpen(true)}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs border-none cursor-pointer flex items-center gap-1.5"
                        >
                            <IconPlus className="w-4 h-4" />
                            <span>Tạo sự kiện mới</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-4 w-full">
                        {filteredEvents.map((evt) => (
                            <EventCard key={evt._id || evt.id} event={evt} />
                        ))}
                    </div>
                )}
            </main>

            {/* Modals */}
            <CreateEventModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                templates={templates}
                tags={tags}
                users={users}
                onCreated={handleEventCreated}
                onSuccess={handleEventCreated}
            />

            <ManageTemplatesModal
                isOpen={isManageTemplatesOpen}
                onClose={() => setIsManageTemplatesOpen(false)}
                templates={templates}
                onTemplatesChange={() => fetchInitialMeta()}
                onRefreshTemplates={() => fetchInitialMeta()}
                onUseTemplate={(tpl) => {
                    setIsManageTemplatesOpen(false);
                    setIsCreateOpen(true);
                }}
            />

            {/* Global Event Chat Widget */}
            <EventChatBubble />
        </div>
    );
}

