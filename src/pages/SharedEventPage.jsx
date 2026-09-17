import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EventHeader from '@/components/header/EventHeader';
import RoadmapTreeView from '@/components/tabs/roadmap/RoadmapTreeView';
import RoadmapGanttView from '@/components/tabs/roadmap/RoadmapGanttView';
import EventStationMatrixView from '@/components/tabs/stations/EventStationMatrixView';
import EventEquipmentChecklistView from '@/components/tabs/equipment/EventEquipmentChecklistView';
import EventMembersView from '@/components/tabs/staff/EventMembersView';
import BudgetExpenseView from '@/components/tabs/budget/BudgetExpenseView';
import MediaDriveGalleryView from '@/components/tabs/media/MediaDriveGalleryView';
import RetrospectiveView from '@/components/tabs/retro/RetrospectiveView';
import EventChatBubble from '@/components/chat/EventChatBubble';
import Loading from '@/components/(ui)/(loading)/loading';
import { IconLock, IconAlertCircle, IconArrowLeft } from '@/components/icons';
import { eventStorageService } from '@/services/eventStorageService';

export default function SharedEventPage() {
    const { token } = useParams();
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('stations');
    const [roadmapMode, setRoadmapMode] = useState('tree');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSharedEvent = async () => {
            try {
                const data = await eventStorageService.getEventByShareToken(token);
                if (data.success && data.event) {
                    setEvent(data.event);
                    const usersData = await eventStorageService.getUsers();
                    setUsers(usersData.users || []);
                } else {
                    setErrorMessage(data.message || 'Không tìm thấy sự kiện chia sẻ hoặc liên kết đã hết hạn.');
                }
            } catch (err) {
                console.error('Error loading shared event:', err);
                setErrorMessage('Đã xảy ra lỗi khi tải thông tin sự kiện.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchSharedEvent();
        }
    }, [token]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-secondary)] flex items-center justify-center">
                <Loading text="Đang tải sự kiện công khai..." />
            </div>
        );
    }

    if (errorMessage || !event) {
        return (
            <div className="min-h-screen bg-[var(--bg-secondary)] flex flex-col items-center justify-center p-4">
                <div className="max-w-md w-full bg-[var(--bg-primary)] p-8 rounded-2xl border border-[var(--border-color)] text-center shadow-md">
                    <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconAlertCircle className="w-8 h-8" />
                    </div>
                    <h2 className="text-lg font-black text-[var(--text-primary)] mb-2">Không thể truy cập</h2>
                    <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
                        {errorMessage || 'Liên kết chia sẻ không hợp lệ.'}
                    </p>
                    <Link
                        to="/events"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                        <IconArrowLeft className="w-4 h-4" />
                        <span>Về danh sách sự kiện</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-secondary)] flex flex-col justify-between">
            {/* Public Badge Notification Banner */}
            <div className="bg-blue-600 text-white text-xs py-2 px-4 text-center font-semibold flex items-center justify-center gap-2">
                <IconLock className="w-3.5 h-3.5" />
                <span>Bạn đang xem chế độ công khai (Chỉ đọc) của sự kiện: {event.title}</span>
            </div>

            {/* Header */}
            <EventHeader
                event={event}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                canViewBudget={false}
                readOnly={true}
                users={users}
            />

            {/* Tab Contents Container (Read-Only) */}
            <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 flex-1 flex flex-col">
                {activeTab === 'stations' && (
                    <EventStationMatrixView
                        event={event}
                        users={users}
                        members={event.members || []}
                        readOnly={true}
                    />
                )}

                {activeTab === 'roadmap' && (
                    <div className="flex flex-col gap-4">
                        {roadmapMode === 'tree' ? (
                            <RoadmapTreeView event={event} roadmap={event.roadmap || []} users={users} readOnly={true} />
                        ) : (
                            <RoadmapGanttView event={event} roadmap={event.roadmap || []} users={users} readOnly={true} />
                        )}
                    </div>
                )}

                {activeTab === 'staff' && (
                    <EventMembersView event={event} members={event.members || []} users={users} readOnly={true} />
                )}

                {activeTab === 'equipment' && (
                    <EventEquipmentChecklistView event={event} checklist={event.equipmentChecklist || []} users={users} readOnly={true} />
                )}

                {activeTab === 'media' && (
                    <MediaDriveGalleryView event={event} media={event.media || []} readOnly={true} />
                )}

                {activeTab === 'retro' && (
                    <RetrospectiveView event={event} retro={event.retro || {}} users={users} readOnly={true} />
                )}
            </main>

            <EventChatBubble eventId={event._id || event.id} readOnly={true} />
        </div>
    );
}
