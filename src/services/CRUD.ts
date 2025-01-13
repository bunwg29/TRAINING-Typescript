import { endPoint } from '@/api/endPoint';
import { instanceAxios } from '@/api/setup';
import { showNotification } from '@/helpers/showNotification';
import { Router } from '@/routers/Router';

export async function handleActivateUser(
  target: HTMLElement,
  userId: string,
): Promise<void> {
  const statusElement = target
    .closest('.list-user')
    ?.querySelector('.info-activity__inactive');
  if (!statusElement) {
    showNotification('Cannot find user status element');
    return;
  }

  try {
    const response = await instanceAxios.patch(endPoint.getUserById(userId), {
      active_status: 'Active',
    });
    if (isSuccessfulResponse(response)) {
      statusElement.classList.replace(
        'info-activity__inactive',
        'info-activity__active',
      );
      statusElement.textContent = '• Active';
    } else {
      showNotification('Error when update data');
    }
  } catch (error) {
    handleError('Error while activating user', error);
    showNotification('Wait and reload');
  }
}

export function isSuccessfulResponse(response: { status: number }): boolean {
  return response.status === 200;
}

export function handleError(
  message: string,
  error?: Error | string | unknown,
): void {
  if (error instanceof Error) {
    console.error(message, error.message);
  } else if (typeof error === 'string') {
    console.error(message, error);
  } else {
    console.error(message, 'Unknown error');
  }
  showNotification(message);
}

export const viewProfile = (userId: string) =>
  Router.pushState(`/view-profile/${userId}`);

export const editProfile = (userId: string) =>
  Router.pushState(`/edit-profile/${userId}`);

export const deleteUser = async (userId: string) => {
  try {
    const response = await instanceAxios.delete(endPoint.getUserById(userId));
    if (isSuccessfulResponse(response)) {
      showNotification('Delete successfully');
      Router.pushState('/');
    } else {
      showNotification('Error when delete data');
      Router.pushState('/');
    }
  } catch (error) {
    showNotification('Wait and reload');
    handleError('Error server', error);
    Router.pushState('/');
  }
};
