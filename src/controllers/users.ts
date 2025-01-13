import { showNotification } from '@/helpers/showNotification';
import { endPoint } from '../api/endPoint';
import { instanceAxios } from '../api/setup';
import { activityType, UsersModel } from '../models/users';

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

export class UserController {
  /**
   * Fetches the list of users from the API
   * @param url - Endpoint to fetch data
   * @returns - A list of users and the total count
   */
  private static async fetchUsers(url: string): Promise<{ users: UserResponse[], totalCount: number }> {
    try {
      const res = await instanceAxios.get(url);
      const totalCount = parseInt(res.headers['x-total-count']);
      const users = res.data.map((user: UserResponse) => new UsersModel(
        user.id,
        user.firstname,
        user.lastname,
        user.email,
        user.active_status,
        user.last_login,
        user.paid_status,
        user.paid_day,
        user.amount,
        user.activity
      ));
      return { users, totalCount };
    } catch (error) {
      showNotification('Wait a minute, and reload page');
      console.error('Error fetching users:', error);
      return { users: [], totalCount: 0 };
    }
  }

  /**
   * Adds a new user
   * @param user - User information to be added
   * @returns - The added user or null if an error occurs
   */
  public static async addUser(user: UserResponse): Promise<UserResponse | null> {
    try {
      const res = await instanceAxios.post(endPoint.getAll(), user);
      return res.data as UserResponse;
    } catch (error) {
      console.error('Error adding user:', error);
      showNotification('Error adding user');
      return null;
    }
  }

  /**
   * Fetches user information by ID
   * @param url - Endpoint to fetch user information
   * @param includeActivity - Whether to include activity data
   * @returns - The user data or null if an error occurs
   */
  private static async fetchUserById(url: string, includeActivity: boolean): Promise<UsersModel | null> {
    try {
      const res = await instanceAxios.get(url);
      const user = res.data;
      return new UsersModel(
        user.id,
        user.firstname,
        user.lastname,
        user.email,
        user.active_status,
        user.last_login,
        user.paid_status,
        user.paid_day,
        user.amount,
        includeActivity ? user.activity : []
      );
    } catch (error) {
      showNotification('Wait a minute, and reload page');
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }

  /**
   * Public API to get user information by ID
   * @param userId - User ID
   * @param includeActivity - Whether to include activity data (default is false)
   */
  public static getUserById(userId: number, includeActivity = false): Promise<UsersModel | null> {
    return this.fetchUserById(endPoint.getUserById(userId), includeActivity);
  }

  /**
   * Updates user information
   * @param userId - User ID to be updated
   * @param userData - Updated user information
   * @returns - The updated user or null if an error occurs
   */
  public static async updateUser(userId: number, userData: Partial<UserResponse>): Promise<UserResponse | null> {
    try {
      const res = await instanceAxios.patch(endPoint.getUserById(userId), userData);
      showNotification('User updated successfully');
      return res.data as UserResponse;
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification('Error updating user');
      return null;
    }
  }

  /**
   * Calculates the total amount paid by all users
   * @returns - The total amount or 0 if an error occurs
   */
  public static async getTotalPaidAmount(): Promise<number> {
    try {
      const res = await instanceAxios.get(endPoint.getPaidAmount());
      const users = res.data as UserResponse[];
      return users.reduce((sum, user) => {
        const amount = parseFloat(user.amount.replace('$', '').replace(/,/g, ''));
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
    } catch (error) {
      showNotification('Wait a minute, and reload page');
      console.error('Error calculating total paid amount:', error);
      return 0;
    }
  }

  /**
   * Retrieves all users by page
   * @param pages - The page number to fetch
   * @returns - A list of users and the total count
   */
  static getAllUsers(pages: number): Promise<{ users: UserResponse[], totalCount: number }> {
    const url = endPoint.getAllUser(pages);
    return this.fetchUsers(url);
  }

  /**
   * Retrieves a list of paid users by page
   * @param page - The page number to fetch
   */
  static getPaidUser(page: number): Promise<{ users: UserResponse[], totalCount: number }> {
    const url = endPoint.getUserType('Paid', page);
    return this.fetchUsers(url);
  }

  /**
   * Retrieves a list of unpaid users by page
   * @param page - The page number to fetch
   */
  static getUnpaid(page: number): Promise<{ users: UserResponse[], totalCount: number }> {
    const url = endPoint.getUserType('Unpaid', page);
    return this.fetchUsers(url);
  }

  /**
   * Retrieves a list of overdue users by page
   * @param page - The page number to fetch
   */
  static getOverdue(page: number): Promise<{ users: UserResponse[], totalCount: number }> {
    const url = endPoint.getUserType('Overdue', page);
    return this.fetchUsers(url);
  }
}
