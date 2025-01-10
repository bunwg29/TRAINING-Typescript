import { UserController } from '@/controllers/users.controller';
import { getFormData } from '@/helpers/formData.helpers';
import { showNotification } from '@/helpers/showNotification.helpers';
import { BaseUserForm } from './BaseUserForm';

export class CreateUser extends BaseUserForm {
  constructor() {
    super();
  }

  protected addFormActions(form: HTMLFormElement): void {
    const formActions = document.createElement('div');
    formActions.className = 'form-actions';
    const submitButton = this.createButton('submit', 'Submit', 'submit-btn');
    formActions.appendChild(submitButton);
    form.appendChild(formActions);
    
    form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    const userData = getFormData();
    
    UserController.addUser(userData)
      .then(response => {
        if (response) {
          showNotification('User added successfully');
        } else {
          showNotification('Failed to add user');
        }
      })
      .catch(error => {
        console.error('Error during user addition:', error);
        showNotification('Error during user addition');
      });
  }

  public render() {
    return this.createFormContent();
  }
}