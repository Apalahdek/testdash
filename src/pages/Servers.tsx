import React from 'react';
import { Server, Settings } from 'lucide-react';

export function Servers() {
  const servers = [
    {
      id: '1',
      name: 'Gaming Community',
      icon: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=64&h=64&q=80',
      memberCount: 1250,
    },
    {
      id: '2',
      name: 'Developer Hub',
      icon: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=64&h=64&q=80',
      memberCount: 890,
    },
    // Add more servers as needed
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Servers</h1>
      
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servers.map((server) => (
          <div
            key={server.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src={server.icon}
                  alt={server.name}
                />
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{server.name}</h2>
                  <p className="text-sm text-gray-500">{server.memberCount} members</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  <Server className="h-4 w-4 mr-2" />
                  View Details
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}