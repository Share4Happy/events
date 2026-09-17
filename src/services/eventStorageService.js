import { MOCK_EVENTS, MOCK_USERS, MOCK_TAGS, MOCK_TEMPLATES } from './mockEventsData';

const STORAGE_KEYS = {
    EVENTS: 'air_events_data_v2',
    USERS: 'air_events_users_v2',
    TAGS: 'air_events_tags_v2',
    TEMPLATES: 'air_events_templates_v2',
    MESSAGES: 'air_events_messages_v2',
};

// Initialize Storage with mock data if empty
function initializeStorage() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(MOCK_EVENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TAGS)) {
        localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(MOCK_TAGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TEMPLATES)) {
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(MOCK_TEMPLATES));
    }
}

initializeStorage();

export const eventStorageService = {
    // 1. Events List & Query
    async getEvents({ search = '', type = 'all', status = 'all', tag = 'all' } = {}) {
        initializeStorage();
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');

        let filtered = [...raw];

        if (search.trim()) {
            const query = search.toLowerCase().trim();
            filtered = filtered.filter(
                (e) =>
                    (e.title || '').toLowerCase().includes(query) ||
                    (e.location || '').toLowerCase().includes(query) ||
                    (e.description || '').toLowerCase().includes(query)
            );
        }

        if (type !== 'all') {
            filtered = filtered.filter((e) => e.type === type);
        }

        if (tag !== 'all') {
            filtered = filtered.filter((e) => (e.tags || []).includes(tag));
        }

        if (status !== 'all') {
            filtered = filtered.filter((e) => e.status === status);
        }

        return {
            success: true,
            events: filtered,
            total: filtered.length,
            canViewBudget: true,
        };
    },

    // 2. Event Detail
    async getEventById(id) {
        initializeStorage();
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
        const event = raw.find((e) => e._id === id || e.id === id);

        if (!event) {
            return { success: false, message: 'Không tìm thấy sự kiện' };
        }

        return {
            success: true,
            event,
            canViewBudget: true,
        };
    },

    // 3. Create Event
    async createEvent(eventData) {
        initializeStorage();
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
        const templates = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEMPLATES) || '[]');
        const newId = `evt-${Date.now()}`;

        let roadmap = [];
        let budget = { totalEstimated: 0, totalActual: 0, items: [] };

        if (eventData.templateId) {
            const tpl = templates.find(t => t._id === eventData.templateId || t.id === eventData.templateId);
            if (tpl) {
                const baseTime = eventData.startDate ? new Date(eventData.startDate).getTime() : Date.now();

                if (Array.isArray(tpl.roadmapNodes)) {
                    roadmap = tpl.roadmapNodes.map((node) => {
                        const startMs = baseTime + (node.relativeDaysStart || 0) * 86400000;
                        const dueMs = baseTime + (node.relativeDaysDue || 0) * 86400000;
                        return {
                            id: node.id || `rm-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                            parentId: node.parentId || null,
                            name: node.name,
                            description: node.description || '',
                            priority: node.priority || 'medium',
                            startDate: new Date(startMs).toISOString().split('T')[0],
                            dueDate: new Date(dueMs).toISOString().split('T')[0],
                            completed: false,
                            order: node.order || 0,
                            assignee: '',
                        };
                    });
                }

                if (Array.isArray(tpl.budgetItems)) {
                    const items = tpl.budgetItems.map((item, idx) => ({
                        id: `bg-${Date.now()}-${idx}`,
                        name: item.name,
                        category: item.category || 'Khác',
                        type: 'expense',
                        estimatedCost: item.defaultEstimatedCost || item.estimatedCost || 0,
                        actualCost: 0,
                        status: 'pending',
                        paidBy: '',
                        note: item.note || '',
                    }));
                    const totalEstimated = items.reduce((sum, it) => sum + (Number(it.estimatedCost) || 0), 0);
                    budget = { currency: 'VND', totalEstimated, totalActual: 0, items };
                }
            }
        }

        const newEvent = {
            _id: newId,
            id: newId,
            createdAt: new Date().toISOString(),
            status: eventData.status || 'upcoming',
            stations: [],
            scenarios: [],
            roadmap,
            members: [],
            equipmentChecklist: [],
            budget,
            media: [],
            retro: { whatWentWell: [], whatCouldBeImproved: [], actionItems: [], kudos: [] },
            zaloConfig: { enabled: false, broadcastHistory: [] },
            guide: { sections: [] },
            ...eventData,
        };

        raw.unshift(newEvent);
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(raw));

        return { success: true, event: newEvent };
    },


    // 4. Update Event
    async updateEvent(id, updateData) {
        initializeStorage();
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
        const idx = raw.findIndex((e) => e._id === id || e.id === id);

        if (idx === -1) {
            return { success: false, message: 'Sự kiện không tồn tại' };
        }

        const updated = {
            ...raw[idx],
            ...updateData,
            updatedAt: new Date().toISOString(),
        };

        raw[idx] = updated;
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(raw));

        return { success: true, event: updated };
    },

    // 5. Delete Event
    async deleteEvent(id) {
        initializeStorage();
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
        const filtered = raw.filter((e) => e._id !== id && e.id !== id);
        localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(filtered));

        return { success: true, message: 'Đã xóa sự kiện thành công' };
    },

    // 6. Users / Members Picker
    async getUsers() {
        initializeStorage();
        const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
        return { success: true, users };
    },

    // 7. Tags
    async getTags() {
        initializeStorage();
        const tags = JSON.parse(localStorage.getItem(STORAGE_KEYS.TAGS) || '[]');
        return { success: true, tags };
    },

    async createTag(name, color) {
        initializeStorage();
        const tags = JSON.parse(localStorage.getItem(STORAGE_KEYS.TAGS) || '[]');
        const newTag = {
            _id: `tag-${Date.now()}`,
            name,
            color: color || 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
        };
        tags.push(newTag);
        localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(tags));
        return { success: true, tag: newTag };
    },

    async deleteTag(id) {
        initializeStorage();
        const tags = JSON.parse(localStorage.getItem(STORAGE_KEYS.TAGS) || '[]');
        const filtered = tags.filter((t) => t._id !== id);
        localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(filtered));
        return { success: true };
    },

    // 8. Templates
    async getTemplates() {
        initializeStorage();
        const templates = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEMPLATES) || '[]');
        return { success: true, templates };
    },

    async createTemplate(templateData) {
        initializeStorage();
        const templates = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEMPLATES) || '[]');
        const newTemplate = {
            _id: `tpl-${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...templateData,
        };
        templates.push(newTemplate);
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
        return { success: true, template: newTemplate };
    },

    async deleteTemplate(id) {
        initializeStorage();
        const templates = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEMPLATES) || '[]');
        const filtered = templates.filter((t) => t._id !== id);
        localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(filtered));
        return { success: true };
    },

    // 9. Public Share Token Lookup
    async getEventByShareToken(token) {
        initializeStorage();
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
        const event = raw.find((e) => e.shareToken === token && e.isShared);
        if (!event) {
            return { success: false, message: 'Liên kết chia sẻ không tồn tại hoặc đã hết hạn.' };
        }
        return { success: true, event };
    },

    // 10. Chat Messages
    async getChatMessages(eventId) {
        initializeStorage();
        const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '{}');
        return { success: true, messages: all[eventId] || [] };
    },

    async sendChatMessage(eventId, message) {
        initializeStorage();
        const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '{}');
        if (!all[eventId]) all[eventId] = [];
        const newMsg = {
            id: `msg-${Date.now()}`,
            timestamp: new Date().toISOString(),
            ...message,
        };
        all[eventId].push(newMsg);
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(all));
        return { success: true, message: newMsg };
    },
};
