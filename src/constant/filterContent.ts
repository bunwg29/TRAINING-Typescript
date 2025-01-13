import { FilterOption } from "@/types/Filter";

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