import { instanceAxios } from '@/api/setup';
import { showNotification } from './showNotification.helpers';
import { endPoint } from '@/api/endPoint';

/**
 * - This function will get user id from url
 */
const getUserIdFromURL = (): string | null => {
  const url = new URL(window.location.href);
  return url.searchParams.get('userId');
};

/**
 * - When admin want change status to paid
 */
export const payEvent = (button: HTMLElement) => {
  button.addEventListener('click', async () => {
    const userId = getUserIdFromURL();

    if (!userId) {
      showNotification('User ID not found in the URL');
      return;
    }

    const userRow = document.querySelector(`[data-user-id="${userId}"]`);
    const paidStatus = userRow?.querySelector('.info-payment__paid');

    if (paidStatus) {
      showNotification('Payment has already been processed');
      return;
    }

    try {
      await instanceAxios.patch(endPoint.getUserById(userId), {
        paid_status: 'Paid',
      });
      showNotification('Payment status updated successfully');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error updating payment status:', error);
      showNotification('Failed to update payment status');
    }
  });
};
