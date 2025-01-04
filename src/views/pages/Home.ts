import { UserController, UserResponse } from "@/controllers/users.controller";
import { UserView } from "./UserView";

export class Home extends UserView {
  protected async fetchData(): Promise<UserResponse[]> {
    return await UserController.getAllUsers();
  }
}