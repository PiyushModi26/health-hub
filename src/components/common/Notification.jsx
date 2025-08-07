import React, { useEffect, useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import './Notification.css';

const Notification = () => {
  const { notification, hideNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let hideTimer;
    if (notification) {
      setIsVisible(true);
      // Automatically trigger the fade-out and hide logic
      hideTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(hideNotification, 300); // Wait for animation to finish
      }, 5000);
    } else {
      setIsVisible(false);
    }

    return () => clearTimeout(hideTimer); // Cleanup timer
  }, [notification, hideNotification]);

  // We render the container only if there's a notification, to handle animations
  if (!notification) {
    return null;
  }

  return (
    <div className={`notification ${isVisible ? 'show' : ''} notification-${notification.type}`}>
      <div className="notification-content">
        <strong>Time for your medication!</strong>
        <p>{notification.message}</p>
      </div>
      <button 
        onClick={() => {
          setIsVisible(false);
          setTimeout(hideNotification, 300);
        }} 
        className="notification-close"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;