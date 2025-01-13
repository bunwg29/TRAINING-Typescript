// = This function will handle when click buttons show info of user

export const showInfoEvent = (buttonViewMore: HTMLElement) => {
  buttonViewMore.addEventListener('click', (event) => {
    const divParent = (event.target as HTMLElement).closest('.info');
    const activityDiv = divParent?.nextElementSibling as HTMLElement;

    if (activityDiv) {
      activityDiv.style.display = activityDiv.style.display === 'block' ? 'none' : 'block';
    }
  });
};
