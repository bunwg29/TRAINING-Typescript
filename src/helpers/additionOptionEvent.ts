import { showNotification } from './showNotification';
import {
  deleteUser,
  editProfile,
  handleActivateUser,
  viewProfile,
} from '@/services/CRUD';

const ButtonActions = {
  ACTIVATE: 'addition-option-activeUser',
  EDIT: 'addition-option-edit',
  VIEW_PROFILE: 'addition-option-viewProfile',
  DELETE: 'addition-option-deleteUser',
};

export function toggleHiddenClass(element: HTMLElement): void {
  element.classList.toggle('hidden');
}

export function addClickEventHandler(optionDiv: HTMLElement): void {
  optionDiv.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'BUTTON') return;

    const userId = getUserIdFromElement(target);
    if (!userId) {
      showNotification('User ID not found');
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
