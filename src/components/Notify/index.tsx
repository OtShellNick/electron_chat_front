import React, { useState, useEffect, memo } from 'react';
import { createEventListener } from 'helpers/notify';
import { INotificationData } from 'types/types.dict';

import './Notify.scss';

export const Notification: React.FC = memo(() => {
  const [notification, setNotification] = useState<INotificationData | null>(
    null
  );
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const notificationListener =
    createEventListener<INotificationData>('notification');

  useEffect(() => {
    const subscription = notificationListener.subscribe((data) => {
      setNotification(data);

      const id = window.setTimeout(() => {
        setNotification(null);
      }, 30000);

      setTimeoutId(id);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [notificationListener, timeoutId]);

  if (!notification) {
    return null;
  }

  let className = '';
  switch (notification.type) {
    case 'warning':
      className = 'notification-warning';
      break;
    case 'success':
      className = 'notification-success';
      break;
    case 'error':
      className = 'notification-error';
      break;
    default:
      className = 'notification-default';
  }

  return (
    <div className={`notification ${className}`}>{notification.message}</div>
  );
});
