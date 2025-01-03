import React, { useState } from 'react';
import { Megaphone, Plus, Trash } from 'lucide-react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function Announcements() {
  const [newAnnouncement, setNewAnnouncement] = useState({
    message: '',
    startDate: '',
    endDate: '',
  });

  const queryClient = useQueryClient();

  const { data: announcements } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/announcements`
      );
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (announcement: typeof newAnnouncement) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/announcements`,
        announcement
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      setNewAnnouncement({ message: '', startDate: '', endDate: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/announcements/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Announcements</h1>

      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Create Announcement</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <input
                type="text"
                value={newAnnouncement.message}
                onChange={(e) =>
                  setNewAnnouncement({ ...newAnnouncement, message: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={newAnnouncement.startDate}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      startDate: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  value={newAnnouncement.endDate}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      endDate: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <button
              onClick={() => createMutation.mutate(newAnnouncement)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Announcement
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Active Announcements</h2>
          <div className="mt-4 space-y-4">
            {announcements?.map((announcement: any) => (
              <div
                key={announcement.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <Megaphone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {announcement.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(announcement.startDate).toLocaleDateString()} -{' '}
                      {new Date(announcement.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteMutation.mutate(announcement.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}