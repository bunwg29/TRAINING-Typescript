import { UserController } from '@/controllers/users';
import { getFormData } from '@/helpers/formData';
import { showNotification } from '@/helpers/showNotification';
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
          showNotification('userAdded');
          Router.pushState('/');
        } else {
          showNotification('error');
          Router.pushState('/');
        }
      })
      .catch(error => {
        console.error('Error during user addition:', error);
        showNotification('error');
        Router.pushState('/');
      });
  }

  public render() {
    return this.createFormContent();
  }
}