import { UserController } from "@/controllers/users.controller";
import { BaseUserForm } from "./BaseUserForm";
import { AmountUtils } from "@/views/utils/Amount.utils";

export class ViewProfile extends BaseUserForm {
  private userId: string;

  constructor(userId: string) {
    super();
    this.userId = userId;
    this.loadUserData();
  }

  private async loadUserData(): Promise<void> {
    try {
      this.userData = await UserController.getUserById(parseInt(this.userId), false);
      if (this.userData) {
        this.userData.amount = AmountUtils.parseAmount(this.userData.amount).toString();
        this.populateForm();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  protected addFormActions(form: HTMLFormElement): void {
    const formActions = document.createElement('div');
    formActions.className = 'form-actions';
    form.appendChild(formActions);
  }

  public render() {
    const formContent = this.createFormContent();
    setTimeout(() => this.loadUserData(), 0);
    return formContent;
  }
}