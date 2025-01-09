import { createUserEvent } from "@/helpers/createUser.helpers";

export class ButtonCreate {
  constructor() {}

  private ButtonContent(): HTMLElement {
    const button = document.createElement('button');
    button.textContent = 'NEW USERS';
    button.className = 'menu-create';
    createUserEvent(button);
    return button;
  }

  public render(): HTMLElement {
    return this.ButtonContent();
  }
}
