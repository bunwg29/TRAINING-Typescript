/**
 * Interface defining the structure of the user response data
 */
export interface UserResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  active_status: string;
  last_login: string;
  paid_status: string;
  paid_day: string;
  amount: string;
  activity: activityType[];
}

/**
 * - This is part of type in UserResponse types
 */
export type activityType = {
  date: string;
  user_activity: string;
  detail: string;
};