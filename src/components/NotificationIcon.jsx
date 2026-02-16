import React, { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';

const NotificationIcon = () => {
  // Example: Set the number of notifications
  const [notifications, setNotifications] = useState(5);

  return (
    <div className="relative inline-block">
      {/* Notification Icon */}
      <IoNotificationsOutline size={25} className="text-blue-800" />

      {/* Badge for notification count */}
      {notifications > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {notifications}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
