import { FilterManager } from '@/services/FilterManager';

interface FilterOption {
  value: string;
  label: string;
  checked?: boolean;
}

export const SORT_OPTIONS: FilterOption[] = [
  { value: 'default', label: 'Default', checked: true },
  { value: 'first-name', label: 'First Name' },
  { value: 'last-name', label: 'Last Name' },
  { value: 'due-date', label: 'Due Date' },
  { value: 'last-login', label: 'Last Login' },
];

export const USER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All', checked: true },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export class FilterContent {
  private filterManager: FilterManager;

  constructor() {
    this.filterManager = FilterManager.getInstance();
  }
  private createRadioOptions(
    options: FilterOption[],
    name: string,
  ): HTMLElement {
    const ul = document.createElement('ul');

    options.forEach(option => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      const input = document.createElement('input');

      input.type = 'radio';
      input.name = name;
      input.value = option.value;
      if (option.checked) input.checked = true;
      input.addEventListener('change', () => {
        if (name === 'sort') {
          this.filterManager.setState({ sortBy: option.value });
        } else if (name === 'users') {
          this.filterManager.setState({ userStatus: option.value });
        }
      });
      label.textContent = option.label;
      label.appendChild(input);
      li.appendChild(label);
      ul.appendChild(li);
    });

    return ul;
  }

  private createFilterContent(): HTMLElement {
    const filterDiv = document.createElement('div');
    filterDiv.className = 'filter-active hidden';

    const sortDiv = document.createElement('div');
    sortDiv.className = 'sort';
    const sortTitle = document.createElement('p');
    sortTitle.className = 'sort-title';
    sortTitle.textContent = 'SORT BY:';
    sortDiv.appendChild(sortTitle);
    sortDiv.appendChild(this.createRadioOptions(SORT_OPTIONS, 'sort'));

    const usersDiv = document.createElement('div');
    usersDiv.className = 'users';
    const usersTitle = document.createElement('p');
    usersTitle.className = 'users-title';
    usersTitle.textContent = 'USERS:';
    usersDiv.appendChild(usersTitle);
    usersDiv.appendChild(this.createRadioOptions(USER_OPTIONS, 'users'));

    filterDiv.appendChild(sortDiv);
    filterDiv.appendChild(usersDiv);

    return filterDiv;
  }

  public render(): HTMLElement {
    return this.createFilterContent();
  }
}
