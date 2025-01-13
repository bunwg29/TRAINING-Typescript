// - This function will display information for users when they successfully an action

import { NotificationMessages } from '@/constant/notificationContent';
import { NotificationKey } from '@/types/Notification';

export function showNotification(messageKey: NotificationKey) {
  const message = NotificationMessages[messageKey];
  const notification = document.createElement('div');
  notification.classList.add('notification');

  notification.innerHTML = message;
  document.body.appendChild(notification);

  // Show notification with a slight delay
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Hide and remove notification after delay
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}
