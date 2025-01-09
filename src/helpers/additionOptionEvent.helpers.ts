import { instanceAxios } from '@/api/setup';
import { showNotification } from './showNotification.helpers';

/**
 * Toggles the 'hidden' class on the given element.
 * @param element - The element to toggle the 'hidden' class on.
 */
export function toggleHiddenClass(element: HTMLElement): void {
  element.classList.toggle('hidden');
}

/**
 * Adds click event handlers to the buttons in the option div.
 * @param {HTMLElement} optionDiv - The div element containing the buttons.
 */
export function addClickEventHandler(optionDiv: HTMLElement): void {
  optionDiv.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      const listUserElement = target.closest('.list-user') as HTMLElement | null;
      if (!listUserElement) return;

      const userId = listUserElement.getAttribute('data-user-id');
      
      // Handle different button actions
      switch (target.className) {
        case 'addition-option-activeUser':
          await handleActivateUser(listUserElement, userId);
          break;
        case 'addition-option-edit':
          // TODO: Handle edit action
          console.log('Edit clicked for user:', userId);
          break;
        case 'addition-option-viewProfile':
          // TODO: Handle view profile action
          console.log('View Profile clicked for user:', userId);
          break;
        case 'addition-option-deleteUser':
          // TODO: Handle delete action
          console.log('Delete clicked for user:', userId);
          break;
      }
    }
  });
}

/**
 * Handles the activation of a user.
 * @param {HTMLElement} listUserElement - The user list item element.
 * @param {string | null} userId - The ID of the user to activate.
 */
async function handleActivateUser(listUserElement: HTMLElement, userId: string | null): Promise<void> {
  if (!userId) {
    showNotification("User not found");
    return;
  }

  const statusElement = listUserElement.querySelector('.info-activity__inactive');
  
  if (statusElement) {
    try {
      const response = await instanceAxios.patch(`/user_data/${userId}`, {
        active_status: 'Active'
      });

      if (response.status === 200) {
        statusElement.classList.remove('info-activity__inactive');
        statusElement.classList.add('info-activity__active');
        statusElement.textContent = '• Active';
      } else {
        showNotification("Error when update data");
      }
    } catch (error) {
      console.error('Error while activating user:', error);
      showNotification("Error when update data");
    }
  } else {
    showNotification("User already exist");
  }
}
