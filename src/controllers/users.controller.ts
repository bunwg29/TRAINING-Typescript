import { endPoint } from '../api/endPoint';
import { instanceAxios } from '../api/setup';
import { activityType, UsersModel } from '../models/users.model';

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
  private static async fetchUsers(url: string): Promise<UserResponse[]> {
    try {
      const res = await instanceAxios.get(url);
      return res.data.map((user: UserResponse) => new UsersModel(
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
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  static getAllUsers(): Promise<UserResponse[]> {
    const url = endPoint.getAllUser(10);
    return this.fetchUsers(url);
  }

  static getPaidUser(): Promise<UserResponse[]> {
    const url = endPoint.getUserType('Paid');
    return this.fetchUsers(url);
  }

  static getUnpaid(): Promise<UserResponse[]> {
    const url = endPoint.getUserType('Unpaid');
    return this.fetchUsers(url);
  }

  static getOverdue(): Promise<UserResponse[]> {
    const url = endPoint.getUserType('Overdue');
    return this.fetchUsers(url);
  }
}
