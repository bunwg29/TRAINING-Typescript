import { NotificationKey } from "@/types/Notification";

// Define the message dictionary
export const NotificationMessages: Record<NotificationKey, string> = {
  success: 'Operation completed successfully',
  error: 'An error occurred',
  warning: 'Warning: Please check your input',
  info: 'Please note this information',
  userAdded: 'User has been added successfully',
  userUpdated: 'User has been updated successfully',
  userDeleted: 'User has been deleted successfully',
  loadError: 'Error loading data. Please try again',
  saveError: 'Error saving data. Please try again',
  networkError: 'Network connection error. Please check your connection',
  notUser: 'Not found user',
  paymentExist: 'Payment has already been processed',
  paymentUpdate: 'Payment status updated successfully',
  paymentFailed: 'Failed to update payment status'
};