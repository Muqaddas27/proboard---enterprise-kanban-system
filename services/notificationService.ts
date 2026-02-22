import React from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

let listeners: ((notification: Notification) => void)[] = [];
let dismissListeners: ((id: string) => void)[] = [];

export const notificationService = {
  subscribe: (listener: (notification: Notification) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  subscribeDismiss: (listener: (id: string) => void) => {
    dismissListeners.push(listener);
    return () => {
      dismissListeners = dismissListeners.filter(l => l !== listener);
    };
  },

  notify: (notification: Notification) => {
    const id = notification.id || `notif-${Date.now()}`;
    const notif = { ...notification, id };
    listeners.forEach(listener => listener(notif));

    if (notification.duration !== 0) {
      const duration = notification.duration || 3000;
      setTimeout(() => {
        dismissListeners.forEach(listener => listener(id));
      }, duration);
    }

    return id;
  },

  success: (title: string, message?: string) => {
    return notificationService.notify({
      id: `success-${Date.now()}`,
      type: 'success',
      title,
      message,
      duration: 3000,
    });
  },

  error: (title: string, message?: string) => {
    return notificationService.notify({
      id: `error-${Date.now()}`,
      type: 'error',
      title,
      message,
      duration: 4000,
    });
  },

  info: (title: string, message?: string) => {
    return notificationService.notify({
      id: `info-${Date.now()}`,
      type: 'info',
      title,
      message,
      duration: 3000,
    });
  },

  warning: (title: string, message?: string) => {
    return notificationService.notify({
      id: `warning-${Date.now()}`,
      type: 'warning',
      title,
      message,
      duration: 3500,
    });
  },

  dismiss: (id: string) => {
    dismissListeners.forEach(listener => listener(id));
  },
};
