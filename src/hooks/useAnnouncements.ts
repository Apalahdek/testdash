import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAnnouncementStore } from '../store/announcement';

export function useAnnouncements() {
  const { setAnnouncement } = useAnnouncementStore();

  return useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/announcements`
      );
      
      // Find active announcement
      const now = new Date();
      const activeAnnouncement = data.find((announcement: any) => {
        const startDate = new Date(announcement.startDate);
        const endDate = new Date(announcement.endDate);
        return now >= startDate && now <= endDate;
      });

      if (activeAnnouncement) {
        setAnnouncement(activeAnnouncement);
      }

      return data;
    },
  });
}