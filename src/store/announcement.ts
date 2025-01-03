import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Announcement {
  id: string;
  message: string;
  startDate: string;
  endDate: string;
}

interface AnnouncementState {
  announcement: Announcement | null;
  hiddenAnnouncements: string[];
  setAnnouncement: (announcement: Announcement) => void;
  hideAnnouncement: () => void;
}

export const useAnnouncementStore = create<AnnouncementState>()(
  persist(
    (set, get) => ({
      announcement: null,
      hiddenAnnouncements: [],
      setAnnouncement: (announcement) => {
        const { hiddenAnnouncements } = get();
        if (!hiddenAnnouncements.includes(announcement.id)) {
          set({ announcement });
        }
      },
      hideAnnouncement: () => {
        const { announcement, hiddenAnnouncements } = get();
        if (announcement) {
          set({
            announcement: null,
            hiddenAnnouncements: [...hiddenAnnouncements, announcement.id],
          });
        }
      },
    }),
    {
      name: 'announcement-storage',
    }
  )
);