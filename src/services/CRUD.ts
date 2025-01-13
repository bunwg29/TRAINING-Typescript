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
    showNotification('notUser');
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
      showNotification('saveError');
    }
  } catch (error) {
    console.log(error)
    showNotification('networkError');
  }
}

export function isSuccessfulResponse(response: { status: number }): boolean {
  return response.status === 200;
}

export const viewProfile = (userId: string) =>
  Router.pushState(`/view-profile/${userId}`);

export const editProfile = (userId: string) =>
  Router.pushState(`/edit-profile/${userId}`);

export const deleteUser = async (userId: string) => {
  try {
    const response = await instanceAxios.delete(endPoint.getUserById(userId));
    if (isSuccessfulResponse(response)) {
      showNotification('userDeleted');
      Router.pushState('/');
    } else {
      showNotification('networkError');
      Router.pushState('/');
    }
  } catch (error) {
    console.log(error);
    showNotification('networkError');
    Router.pushState('/');
  }
};
