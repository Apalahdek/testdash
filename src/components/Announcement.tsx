import React from 'react';
import { XCircle, AlertCircle } from 'lucide-react';
import { useAnnouncementStore } from '../store/announcement';

export function Announcement() {
  const { announcement, hideAnnouncement } = useAnnouncementStore();

  if (!announcement) return null;

  return (
    <div className="bg-indigo-600 text-white px-4 py-3 relative">
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <AlertCircle className="h-5 w-5 mr-2" />
        <p className="text-sm font-medium flex-1 text-center">
          {announcement.message}
        </p>
        <button
          onClick={hideAnnouncement}
          className="ml-4 text-white hover:text-indigo-100"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}