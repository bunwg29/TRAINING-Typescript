import { UserController } from '@/controllers/users';
import { getFormData } from '@/helpers/formData';
import { showNotification } from '@/helpers/showNotification';
import { BaseUserForm } from './BaseUserForm';
import { AmountUtils } from '@/views/utils/Amount';
import { Router } from '@/routers/Router';

export class EditUser extends BaseUserForm {
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
        this.userData.amount = AmountUtils.formatForInput(this.userData.amount);
        this.populateForm();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  protected addFormActions(form: HTMLFormElement): void {
    const formActions = document.createElement('div');
    formActions.className = 'form-actions';
    const submitButton = this.createButton('submit', 'Update', 'submit-btn');
    formActions.appendChild(submitButton);
    form.appendChild(formActions);

    form.addEventListener('submit', this.handleSubmit);
  }

  private handleSubmit = async (event: Event) => {
    event.preventDefault();

    try {
      const formData = getFormData();
      const response = await UserController.updateUser(parseInt(this.userId), formData);
      if (response) {
        showNotification('User updated successfully');
        Router.pushState('/');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification('Error updating user');
      Router.pushState('/');
    }
  }

  public render() {
    const formContent = this.createFormContent();
    setTimeout(() => this.loadUserData(), 0);
    return formContent;
  }
}