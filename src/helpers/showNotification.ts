// - This function will display information for users when they successfully an action

export function showNotification(message: string) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.innerHTML = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 3000);
}
