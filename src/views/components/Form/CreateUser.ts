import { DOM } from "@/views/utils/DOM";

export class CreateUser {

  private readonly dom: DOM;
  constructor() {
    this.dom = new DOM();
  }

  private createInput(
    type: string,
    id: string,
    name: string,
    placeholder: string,
    value: string = '',
  ): HTMLInputElement {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = name;
    input.placeholder = placeholder;
    input.value = value;
    return input;
  }

  private createSelect(
    id: string,
    name: string,
    options: { value: string; text: string }[],
  ): HTMLSelectElement {
    const select = document.createElement('select');
    select.id = id;
    select.name = name;
    options.forEach(optionData => {
      const option = document.createElement('option');
      option.value = optionData.value;
      option.textContent = optionData.text;
      select.appendChild(option);
    });
    return select;
  }

  private createFormGroup(
    labelText: string,
    inputElement: HTMLElement,
  ): HTMLDivElement {
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';

    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = inputElement.id;
    formGroup.appendChild(label);

    formGroup.appendChild(inputElement);
    return formGroup;
  }

  private createButton(
    type: 'button' | 'submit' | 'reset',
    text: string,
    className: string,
  ): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;
    return button;
  }

  private createFormContent() {
    const form = document.createElement('form');
    form.id = 'userProfileForm';

    const firstNameInput = this.createInput(
      'text',
      'firstname',
      'firstname',
      'Enter first name',
    );
    form.appendChild(this.createFormGroup('First Name', firstNameInput));

    const lastNameInput = this.createInput(
      'text',
      'lastname',
      'lastname',
      'Enter last name',
    );
    form.appendChild(this.createFormGroup('Last Name', lastNameInput));

    const emailInput = this.createInput(
      'email',
      'email',
      'email',
      'Enter email',
    );
    form.appendChild(this.createFormGroup('Email', emailInput));

    const activeStatusSelect = this.createSelect(
      'active_status',
      'active_status',
      [
        { value: 'Active', text: 'Active' },
        { value: 'Inactive', text: 'Inactive' },
      ],
    );
    form.appendChild(this.createFormGroup('Active Status', activeStatusSelect));

    const lastLoginInput = this.createInput(
      'date',
      'last_login',
      'last_login',
      'Last login date',
    );
    form.appendChild(this.createFormGroup('Last Login', lastLoginInput));

    const paidStatusSelect = this.createSelect('paid_status', 'paid_status', [
      { value: 'Paid', text: 'Paid' },
      { value: 'Unpaid', text: 'Unpaid' },
    ]);
    form.appendChild(this.createFormGroup('Paid Status', paidStatusSelect));

    const paidDayInput = this.createInput(
      'date',
      'paid_day',
      'paid_day',
      'Paid day',
    );
    form.appendChild(this.createFormGroup('Paid Day', paidDayInput));

    const amountInput = this.createInput(
      'number',
      'amount',
      'amount',
      'Amount',
    );
    form.appendChild(this.createFormGroup('Amount', amountInput));

    const formActions = document.createElement('div');
    formActions.className = 'form-actions';
    const submitButton = this.createButton('submit', 'Submit', 'submit-btn');
    formActions.appendChild(submitButton);
    form.appendChild(formActions);
    const div = this.dom.div('form-container');
    div.appendChild(form);
    return div;
  }

  public render() {
    return this.createFormContent();
  }
}
