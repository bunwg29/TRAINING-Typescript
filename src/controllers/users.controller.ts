import { endPoint } from '../api/endPoint';
import { instanceAxios } from '../api/setup';
import { activityType, UsersModel } from '../models/users.model';

/**
 * - Define interface of type response
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
   * 
   * @param url - The url on path that define type of user to get data
   * @returns - user data and total items of this data
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
      console.error(error);
      return { users: [], totalCount: 0 };
    }
  }

  public static async getUserData(userId: string): Promise<{users: UserResponse[]}> {
    try {
      const res = await instanceAxios.get(`/user_data/${userId}`);
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
      return users;
    } catch (error) {
      console.log(error)
      return {users: []};
    }
  }
  
  /**
   * 
   * @param pages - pages number to put to the endpoint order to call API
   * @returns - user data
   */
  
  static getAllUsers(pages: number): Promise<{ users: UserResponse[], totalCount: number }> {
    const url = endPoint.getAllUser(pages);
    return this.fetchUsers(url);
  }

  static getPaidUser(page: number): Promise<{ users: UserResponse[], totalCount: number }> {
    const url = endPoint.getUserType('Paid', page);
    return this.fetchUsers(url);
  }

  static getUnpaid(page: number): Promise<{ users: UserResponse[], totalCount: number }> {
    const url = endPoint.getUserType('Unpaid', page);
    return this.fetchUsers(url);
  }

  static getOverdue(page: number): Promise<{ users: UserResponse[], totalCount: number }> {
    const url = endPoint.getUserType('Overdue', page);
    return this.fetchUsers(url);
  }
}
