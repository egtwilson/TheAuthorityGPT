import React from 'react';
import { Notification } from '../../types/user';

interface Props {
  notifications: Notification[];
}

export default function NotificationArea({ notifications }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-navy-200">
      <h2 className="text-2xl font-bold text-navy-900 mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-navy-600">No new notifications</p>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${
                notification.read ? 'bg-gray-50' : 'bg-yellow-50'
              }`}
            >
              <p className="text-navy-800">{notification.message}</p>
              <p className="text-sm text-navy-500 mt-1">{notification.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
