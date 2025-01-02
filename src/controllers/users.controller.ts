import { endPoint } from '../api/endPoint';
import { instanceAxios } from '../api/setup';
import { activityType, UsersModel } from '../models/Users.model';

export interface UserResponse {
  id: number
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
  constructor() {}

  static async getAllUsers(): Promise<UserResponse[]> {
    try {
      const url = endPoint.getAllUser(10);
      const res = await instanceAxios.get(url);
      const userList = res.data.map((user: UserResponse): UsersModel => {
        const newUser = new UsersModel(
          user.firstname,
          user.lastname,
          user.email,
          user.active_status,
          user.last_login,
          user.paid_status,
          user.paid_day,
          user.amount,
          user.activity,
        );
        return newUser;
      });
      return userList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
