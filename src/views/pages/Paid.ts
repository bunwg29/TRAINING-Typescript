import { UserController, UserResponse } from "@/controllers/users.controller";
import { UserView } from "./UserView";

export class Paid extends UserView {
  protected async fetchData(): Promise<UserResponse[]> {
    return await UserController.getPaidUser();
  }
}