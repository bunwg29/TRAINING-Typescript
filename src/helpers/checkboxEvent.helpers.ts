import icons from '@/constant/icons';

let previousChecked: HTMLElement | null = null;
let previousImg: HTMLImageElement | null = null;

/**
 * - Update the URL with userId or delete it.
 */
const updateURLWithUserId = (userId: string | null) => {
  const url = new URL(window.location.href);
  if (userId) {
    url.searchParams.set('userId', userId);
  } else {
    url.searchParams.delete('userId');
  }
  window.history.pushState({}, '', url.toString());
};

/**
 * - Reset checkbox and icon state.
 */
const resetPreviousState = () => {
  if (previousChecked) {
    previousChecked.classList.remove('checked');
  }
  if (previousImg) {
    previousImg.src = icons.userNonCheckbox;
  }
  previousChecked = null;
  previousImg = null;
};

/**
 * - Event when clicking checkbox.
 */
export const checkboxEvent = (checkbox: HTMLElement, img: HTMLImageElement) => {
  checkbox.addEventListener('click', event => {
    // Reset previous state if any
    if (previousChecked && previousChecked !== checkbox) {
      resetPreviousState();
    }

    // Toggle current status
    const isChecked = checkbox.classList.toggle('checked');
    img.src = isChecked ? icons.userCheckbox : icons.userNonCheckbox;

    if (isChecked) {
      previousChecked = checkbox;
      previousImg = img;

      // Get userId from DOM
      const outerParent = (event.target as HTMLElement).closest('.list-user');
      const userId = outerParent?.getAttribute('data-user-id');
      if (userId) {
        updateURLWithUserId(userId);
      }
    } else {
      updateURLWithUserId(null);
      resetPreviousState();
    }
  });
};
