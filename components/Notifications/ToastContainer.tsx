import React, { useState, useEffect } from 'react';
import { notificationService, Notification, NotificationType } from '../../services/notificationService';

interface ToastProps {
  notification: Notification;
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ notification, onDismiss }) => {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          icon: 'text-emerald-600',
          title: 'text-emerald-900',
          message: 'text-emerald-700',
        };
      case 'error':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          icon: 'text-rose-600',
          title: 'text-rose-900',
          message: 'text-rose-700',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: 'text-amber-600',
          title: 'text-amber-900',
          message: 'text-amber-700',
        };
      case 'info':
      default:
        return {
          bg: 'bg-indigo-50',
          border: 'border-indigo-200',
          icon: 'text-indigo-600',
          title: 'text-indigo-900',
          message: 'text-indigo-700',
        };
    }
  };

  const styles = getStyles(notification.type);

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 shadow-lg flex items-start gap-4 animate-in slide-in-from-right-full duration-300 max-w-md`}>
      <div className={`${styles.icon} flex-shrink-0 mt-0.5`}>
        {getIcon(notification.type)}
      </div>
      <div className="flex-1">
        <h3 className={`${styles.title} font-bold text-sm`}>{notification.title}</h3>
        {notification.message && (
          <p className={`${styles.message} text-sm mt-1`}>{notification.message}</p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="text-gray-400 hover:text-gray-600 flex-shrink-0 mt-0.5"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

const ToastContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notification) => {
      setNotifications(prev => [...prev, notification]);
    });

    const unsubscribeDismiss = notificationService.subscribeDismiss((id) => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    });

    return () => {
      unsubscribe();
      unsubscribeDismiss();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-3 pointer-events-none">
      {notifications.map(notification => (
        <div key={notification.id} className="pointer-events-auto">
          <Toast
            notification={notification}
            onDismiss={() => notificationService.dismiss(notification.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
