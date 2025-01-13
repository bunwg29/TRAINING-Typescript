import { addClickEventHandler } from "@/helpers/additionOptionEvent";

/**
 * Class representing a set of additional options with various actions.
 */
export class AdditionOption {
  constructor() { }

  /**
   * Creates the main div element containing the additional options and appends buttons and a separator line.
   * @returns {HTMLElement} The created div element containing the buttons.
   */
  private createOptionDiv(): HTMLElement {
    // Create the main div element with specified classes
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('addition-option', 'hidden');

    // Create and append the Edit button
    const editButton = this.createButton('Edit', 'addition-option-edit');
    optionDiv.appendChild(editButton);

    // Create and append the View Profile button
    const viewProfileButton = this.createButton(
      'View Profile',
      'addition-option-viewProfile',
    );
    optionDiv.appendChild(viewProfileButton);

    // Create and append the Activate User button
    const activateUserButton = this.createButton(
      'Activate User',
      'addition-option-activeUser',
    );
    optionDiv.appendChild(activateUserButton);

    // Create and append a horizontal separator line
    const hr = document.createElement('hr');
    optionDiv.appendChild(hr);

    // Create and append the Delete User button
    const deleteUserButton = this.createButton(
      'Delete',
      'addition-option-deleteUser',
    );
    optionDiv.appendChild(deleteUserButton);

    // Add click event handlers to the buttons
    addClickEventHandler(optionDiv);

    return optionDiv;
  }

  /**
   * Creates a button element with specified text content and class name.
   * @param {string} text - The text content for the button.
   * @param {string} className - The class name to be added to the button.
   * @returns {HTMLButtonElement} The created button element.
   */
  private createButton(text: string, className: string): HTMLButtonElement {
    // Create a button element and set its text content and class
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    return button;
  }

  /**
   * Renders the option div element containing all the buttons and returns it.
   * @returns {HTMLElement} The rendered option div element.
   */
  public render(): HTMLElement {
    return this.createOptionDiv();
  }
}
