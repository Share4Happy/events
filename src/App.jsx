import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EventsListPage from '@/pages/EventsListPage';
import EventDetailPage from '@/pages/EventDetailPage';
import SharedEventPage from '@/pages/SharedEventPage';
import GuidePage from '@/pages/GuidePage';
import EventDialogProvider from '@/components/common/EventDialogProvider';

export default function App() {
  return (
    <EventDialogProvider>
      <BrowserRouter>
        <Routes>
          {/* Root renders the Events List directly */}
          <Route path="/" element={<EventsListPage />} />
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/share/events/:token" element={<SharedEventPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </EventDialogProvider>
  );
}
