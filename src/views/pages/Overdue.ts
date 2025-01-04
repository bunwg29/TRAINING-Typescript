import { UserController, UserResponse } from "@/controllers/users.controller";
import { UserView } from "./UserView";

export class Overdue extends UserView {
  protected async fetchData(): Promise<UserResponse[]> {
    return await UserController.getOverdue();
  }
}