import { UserController } from '@/controllers/users.controller';
import { getFormData } from '@/helpers/formData.helpers';
import { showNotification } from '@/helpers/showNotification.helpers';
import { BaseUserForm } from './BaseUserForm';
import { Router } from '@/routers/Router';

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
          Router.pushState('/');
        } else {
          showNotification('Failed to add user');
          Router.pushState('/');
        }
      })
      .catch(error => {
        console.error('Error during user addition:', error);
        showNotification('Error during user addition');
        Router.pushState('/');
      });
  }

  public render() {
    return this.createFormContent();
  }
}