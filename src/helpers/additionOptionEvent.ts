import { ButtonActions } from '@/constant/buttonContent';
import { showNotification } from './showNotification';
import {
  deleteUser,
  editProfile,
  handleActivateUser,
  viewProfile,
} from '@/services/CRUD';

export function toggleHiddenClass(element: HTMLElement): void {
  element.classList.toggle('hidden');
}

export function addClickEventHandler(optionDiv: HTMLElement): void {
  optionDiv.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'BUTTON') return;

    const userId = getUserIdFromElement(target);
    if (!userId) {
      showNotification('notUser');
      return;
    }

    switch (target.className) {
      case ButtonActions.ACTIVATE:
        await handleActivateUser(target, userId);
        break;
      case ButtonActions.EDIT:
        editProfile(userId);
        break;
      case ButtonActions.VIEW_PROFILE:
        viewProfile(userId);
        break;
      case ButtonActions.DELETE:
        deleteUser(userId);
        break;
    }
  });
}

function getUserIdFromElement(element: HTMLElement): string | null {
  const listUserElement = element.closest('.list-user') as HTMLElement | null;
  return listUserElement?.getAttribute('data-user-id') || null;
}
