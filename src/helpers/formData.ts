import { UserResponse } from '@/types/UserResponse';
import { AmountUtils } from '../views/utils/Amount';

export const generateId = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Format date to YYYY-MM-DD format
export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format amount to include currency
export const formatAmount = (amount: string): string => {
  return `$${amount}`;
};

export const getFormData = (): UserResponse => {
  const form = document.getElementById('userProfileForm') as HTMLFormElement;
  const formData = new FormData(form);

  const amount = formData.get('amount') as string;

  return {
    id: generateId(),
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
    email: formData.get('email') as string,
    active_status: formData.get('active_status') as string,
    last_login: formatDate(formData.get('last_login') as string),
    paid_status: formData.get('paid_status') as string,
    paid_day: formatDate(formData.get('paid_day') as string),
    amount: AmountUtils.formatInputToAmount(amount),
    activity: [],
  };
};
