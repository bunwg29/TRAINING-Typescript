import { UserController } from '@/controllers/users.controller';
import { getFormData } from '@/helpers/formData.helpers';
import { showNotification } from '@/helpers/showNotification.helpers';
import { BaseUserForm } from './BaseUserForm';
import { AmountUtils } from '@/helpers/AmountUtils.helpers';

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
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification('Error updating user');
    }
  }

  public render() {
    const formContent = this.createFormContent();
    setTimeout(() => this.loadUserData(), 0);
    return formContent;
  }
}