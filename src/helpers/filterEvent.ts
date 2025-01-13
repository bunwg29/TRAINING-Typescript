export const filterBtnEvent = (button: HTMLElement) => {
  button.addEventListener('click', () => {
    const filterActive = button.querySelector('.filter-active');
    if (filterActive) {
      filterActive.classList.toggle('hidden');
    }
  });
};
