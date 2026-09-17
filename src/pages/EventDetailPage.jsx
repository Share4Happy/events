import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventHeader from '@/components/header/EventHeader';
import RoadmapTreeView from '@/components/tabs/roadmap/RoadmapTreeView';
import RoadmapGanttView from '@/components/tabs/roadmap/RoadmapGanttView';
import RoadmapTableView from '@/components/tabs/roadmap/RoadmapTableView';
import EventStationMatrixView from '@/components/tabs/stations/EventStationMatrixView';
import EventMembersView from '@/components/tabs/staff/EventMembersView';
import BudgetExpenseView from '@/components/tabs/budget/BudgetExpenseView';
import MediaDriveGalleryView from '@/components/tabs/media/MediaDriveGalleryView';
import RetrospectiveView from '@/components/tabs/retro/RetrospectiveView';
import EventEquipmentChecklistView from '@/components/tabs/equipment/EventEquipmentChecklistView';
import EventZaloConfigView from '@/components/tabs/zalo-config/EventZaloConfigView';
import EventGuideView from '@/components/tabs/guide/EventGuideView';
import EventChatBubble from '@/components/chat/EventChatBubble';
import Loading from '@/components/(ui)/(loading)/loading';
import { useEventDialog } from '@/components/common';
import { eventStorageService } from '@/services/eventStorageService';

export default function EventDetailPage() {
    const { id: eventId } = useParams();
    const navigate = useNavigate();
    const dialog = useEventDialog();

    const [event, setEvent] = useState(null);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [canViewBudget, setCanViewBudget] = useState(true);
    const [activeTab, setActiveTab] = useState('stations'); // 'stations', 'roadmap', 'equipment', 'staff', 'budget', 'media', 'retro', 'zalo-config', 'guide'
    const [roadmapMode, setRoadmapMode] = useState('tree'); // 'tree' or 'gantt' or 'table'

    const fetchEventDetail = useCallback(async () => {
        if (!eventId) return;
        try {
            const [dataEvt, dataUsers] = await Promise.all([
                eventStorageService.getEventById(eventId),
                eventStorageService.getUsers(),
            ]);

            if (dataEvt.success && dataEvt.event) {
                setEvent(dataEvt.event);
                setCanViewBudget(!!dataEvt.canViewBudget);
            } else {
                dialog.toast(dataEvt.message || 'Không tìm thấy sự kiện', 'error');
                navigate('/events');
            }

            if (dataUsers.success) {
                setUsers(dataUsers.users || []);
                setCurrentUser(dataUsers.users?.[0] || null);
            }
        } catch (err) {
            console.error('Error fetching event detail:', err);
        } finally {
            setLoading(false);
        }
    }, [eventId, navigate, dialog]);

    useEffect(() => {
        fetchEventDetail();
    }, [fetchEventDetail]);

    // Update in Storage
    const updateEventInDB = async (updatePayload) => {
        if (!event) return;
        try {
            const data = await eventStorageService.updateEvent(eventId, updatePayload);
            if (data.success && data.event) {
                setEvent((prev) => ({
                    ...prev,
                    ...data.event,
                }));
            }
        } catch (err) {
            console.error('Error updating event:', err);
        }
    };

    // Status Change
    const handleStatusChange = (newStatus) => {
        updateEventInDB({ status: newStatus });
        dialog.toast(`Đã đổi trạng thái sự kiện thành: ${newStatus}`, 'success');
    };

    // Save as Template
    const handleSaveAsTemplate = async () => {
        if (!event) return;

        const templateName = await dialog.prompt(
            'Nhập tên mẫu sự kiện:',
            `Mẫu ${event.title}`,
            {
                title: 'Lưu thành Mẫu sự kiện',
                placeholder: 'Ví dụ: Mẫu Ngày hội STEM Trường ABC...',
                confirmText: 'Lưu mẫu',
            }
        );
        if (!templateName || !templateName.trim()) return;

        const baseTime = event.startDate ? new Date(event.startDate).getTime() : Date.now();

        const templateRoadmapNodes = (event.roadmap || []).map((node) => {
            let relativeDaysStart = -30;
            let relativeDaysDue = 0;
            if (node.startDate) {
                relativeDaysStart = Math.round((new Date(node.startDate).getTime() - baseTime) / (24 * 60 * 60 * 1000));
            }
            if (node.dueDate) {
                relativeDaysDue = Math.round((new Date(node.dueDate).getTime() - baseTime) / (24 * 60 * 60 * 1000));
            }
            return {
                id: node.id,
                parentId: node.parentId,
                name: node.name,
                description: node.description || '',
                priority: node.priority || 'medium',
                relativeDaysStart,
                relativeDaysDue,
                order: node.order || 0,
            };
        });

        const templateBudgetItems = (event.budget?.items || []).map((item) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            defaultEstimatedCost: item.estimatedCost || 0,
            note: item.note || '',
        }));

        try {
            await eventStorageService.createTemplate({
                name: templateName.trim(),
                type: event.type || 'competition',
                description: event.description || `Mẫu được tạo từ sự kiện ${event.title}`,
                roadmapNodes: templateRoadmapNodes,
                budgetItems: templateBudgetItems,
            });

            try {
                fetch('/api/events/templates', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: templateName.trim(),
                        type: event.type || 'competition',
                        description: event.description || `Mẫu được tạo từ sự kiện ${event.title}`,
                        roadmapNodes: templateRoadmapNodes,
                        budgetItems: templateBudgetItems,
                    }),
                }).catch(() => {});
            } catch (e) {}

            dialog.toast('Đã lưu sự kiện thành Mẫu mới thành công!', 'success');
        } catch (err) {
            console.error('Save template error:', err);
            dialog.alert('Lỗi khi lưu mẫu sự kiện: ' + (err.message || ''), { type: 'danger' });
        }
    };

    // Delete Event
    const handleDeleteEvent = async () => {
        const ok = await dialog.confirm('Bạn có chắc chắn muốn xóa toàn bộ sự kiện này? Thao tác này không thể hoàn tác.', {
            title: 'Xác nhận xóa sự kiện',
            type: 'danger',
            confirmText: 'Xóa vĩnh viễn',
        });
        if (!ok) return;

        try {
            await eventStorageService.deleteEvent(eventId);
            try {
                fetch(`/api/events/${eventId}`, { method: 'DELETE' }).catch(() => {});
            } catch (e) {}
            dialog.toast('Đã xóa sự kiện thành công', 'success');
            navigate('/events');
        } catch (err) {
            console.error('Delete event error:', err);
            dialog.alert('Lỗi khi xóa sự kiện', { type: 'danger' });
        }
    };

    // Generic tab updates
    const handleUpdateMultiple = (fields) => {
        updateEventInDB(fields);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--bg-secondary)] flex items-center justify-center">
                <Loading text="Đang tải dữ liệu sự kiện..." />
            </div>
        );
    }

    if (!event) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[var(--bg-secondary)] flex flex-col justify-between w-full">
            {/* Header & Tabs Navigation */}
            <EventHeader
                event={event}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onTabChange={setActiveTab}
                canViewBudget={canViewBudget}
                users={users}
                onStatusChange={handleStatusChange}
                onSaveAsTemplate={handleSaveAsTemplate}
                canSaveTemplate={true}
                onDeleteEvent={handleDeleteEvent}
                onUpdateEvent={(updated) => updateEventInDB(updated)}
            />


            {/* Tab Contents Container */}
            <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 flex-1 flex flex-col">
                {/* 1. Stations & Scenario Matrix Tab */}
                {activeTab === 'stations' && (
                    <EventStationMatrixView
                        event={event}
                        users={users}
                        members={event.members || []}
                        onUpdateStations={(stations) => updateEventInDB({ stations })}
                        onUpdateScenarios={(scenarios) => updateEventInDB({ scenarios })}
                        onUpdateMultiple={handleUpdateMultiple}
                    />
                )}

                {/* 2. Roadmap Tab */}
                {activeTab === 'roadmap' && (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-end gap-2">
                            <div className="p-1 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center gap-1 shadow-2xs">
                                <button
                                    type="button"
                                    onClick={() => setRoadmapMode('tree')}
                                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer border-none ${
                                        roadmapMode === 'tree'
                                            ? 'bg-blue-600 text-white shadow-xs'
                                            : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                                >
                                    Sơ đồ cây
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRoadmapMode('table')}
                                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer border-none ${
                                        roadmapMode === 'table'
                                            ? 'bg-blue-600 text-white shadow-xs'
                                            : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                                >
                                    Bảng phân việc
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRoadmapMode('gantt')}
                                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer border-none ${
                                        roadmapMode === 'gantt'
                                            ? 'bg-blue-600 text-white shadow-xs'
                                            : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                                >
                                    Biểu đồ Gantt
                                </button>
                            </div>
                        </div>

                        {roadmapMode === 'tree' && (
                            <RoadmapTreeView
                                event={event}
                                roadmap={event.roadmap || []}
                                users={users}
                                members={event.members || []}
                                onUpdateRoadmap={(roadmap) => updateEventInDB({ roadmap })}
                            />
                        )}

                        {roadmapMode === 'table' && (
                            <RoadmapTableView
                                event={event}
                                roadmap={event.roadmap || []}
                                users={users}
                                members={event.members || []}
                                onUpdateRoadmap={(roadmap) => updateEventInDB({ roadmap })}
                            />
                        )}

                        {roadmapMode === 'gantt' && (
                            <RoadmapGanttView
                                event={event}
                                roadmap={event.roadmap || []}
                                users={users}
                                members={event.members || []}
                                onUpdateRoadmap={(roadmap) => updateEventInDB({ roadmap })}
                            />
                        )}
                    </div>
                )}

                {/* 3. Staff & Members Tab */}
                {activeTab === 'staff' && (
                    <EventMembersView
                        event={event}
                        members={event.members || []}
                        users={users}
                        onUpdateMembers={(members) => updateEventInDB({ members })}
                    />
                )}

                {/* 4. Equipment Checklist Tab */}
                {activeTab === 'equipment' && (
                    <EventEquipmentChecklistView
                        event={event}
                        checklist={event.equipmentChecklist || []}
                        users={users}
                        members={event.members || []}
                        onUpdateChecklist={(equipmentChecklist) => updateEventInDB({ equipmentChecklist })}
                        onUpdateMultiple={handleUpdateMultiple}
                    />
                )}

                {/* 5. Budget & Expenses Tab */}
                {activeTab === 'budget' && (
                    <BudgetExpenseView
                        event={event}
                        budget={event.budget || { items: [] }}
                        users={users}
                        onUpdateBudget={(budget) => updateEventInDB({ budget })}
                    />
                )}

                {/* 6. Media Gallery Tab */}
                {activeTab === 'media' && (
                    <MediaDriveGalleryView
                        event={event}
                        media={event.media || []}
                        onUpdateMedia={(media) => updateEventInDB({ media })}
                    />
                )}

                {/* 7. Retrospective Tab */}
                {activeTab === 'retro' && (
                    <RetrospectiveView
                        event={event}
                        retro={event.retro || { whatWentWell: [], whatCouldBeImproved: [], actionItems: [], kudos: [] }}
                        currentUser={currentUser}
                        users={users}
                        onUpdateRetro={(retro) => updateEventInDB({ retro })}
                    />
                )}

                {/* 8. Zalo Config Tab */}
                {activeTab === 'zalo-config' && (
                    <EventZaloConfigView
                        event={event}
                        zaloConfig={event.zaloConfig || { enabled: false, broadcastHistory: [] }}
                        onUpdateZaloConfig={(zaloConfig) => updateEventInDB({ zaloConfig })}
                    />
                )}

                {/* 9. Guide & Checklists Tab */}
                {activeTab === 'guide' && (
                    <EventGuideView
                        event={event}
                        guide={event.guide || { sections: [] }}
                        onUpdateGuide={(guide) => updateEventInDB({ guide })}
                    />
                )}
            </main>

            {/* Event Chat Bubble */}
            <EventChatBubble eventId={event._id || event.id} />
        </div>
    );
}
