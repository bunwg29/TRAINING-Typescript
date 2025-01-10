import { DOM } from '@/views/utils/DOM.utils';
import { UsersModel } from '@/models/users.model';
import { AmountUtils } from '@/views/utils/Amount.utils';

export abstract class BaseUserForm {
  protected readonly dom: DOM;
  protected userData: UsersModel | null = null;

  constructor() {
    this.dom = new DOM();
  }

  protected createInput(
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

    if (type === 'number' && name === 'amount') {
      input.step = '10';
      input.min = '0';
    }
    input.value = value;
    return input;
  }

  protected createSelect(
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

  protected createFormGroup(
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

  protected createButton(
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

  protected createFormFields(form: HTMLFormElement): void {
    const fields = [
      { label: 'First Name', type: 'text', id: 'firstname', placeholder: 'Enter first name' },
      { label: 'Last Name', type: 'text', id: 'lastname', placeholder: 'Enter last name' },
      { label: 'Email', type: 'email', id: 'email', placeholder: 'Enter email' },
      {
        label: 'Active Status',
        type: 'select',
        id: 'active_status',
        options: [
          { value: 'Active', text: 'Active' },
          { value: 'Inactive', text: 'Inactive' },
        ]
      },
      { label: 'Last Login', type: 'date', id: 'last_login', placeholder: 'Last login date' },
      {
        label: 'Paid Status',
        type: 'select',
        id: 'paid_status',
        options: [
          { value: 'Paid', text: 'Paid' },
          { value: 'Unpaid', text: 'Unpaid' },
        ]
      },
      { label: 'Paid Day', type: 'date', id: 'paid_day', placeholder: 'Paid day' },
      { label: 'Amount', type: 'number', id: 'amount', placeholder: 'Enter amount' },
    ];

    fields.forEach(field => {
      const element = field.type === 'select'
        ? this.createSelect(field.id, field.id, field.options!)
        : this.createInput(field.type, field.id, field.id, field.placeholder!);

      form.appendChild(this.createFormGroup(field.label, element));
    });
  }

  protected populateForm(): void {
    if (!this.userData) return;

    const form = document.getElementById('userProfileForm') as HTMLFormElement;
    if (!form) return;

    const fields = [
      'firstname',
      'lastname',
      'email',
      'active_status',
      'last_login',
      'paid_status',
      'paid_day',
      'amount'
    ];

    fields.forEach(field => {
      const element = form.elements.namedItem(field) as HTMLInputElement | HTMLSelectElement;
      if (element) {
        const value = this.userData?.[field as keyof UsersModel];
        if (field === 'amount') {
          element.value = AmountUtils.formatForInput(value as string);
        } else if (element instanceof HTMLInputElement && element.type === 'date') {
          element.value = new Date(value as string).toISOString().split('T')[0];
        } else {
          element.value = value as string;
        }
      }
    });
  }

  protected createFormContent(): HTMLDivElement {
    const form = document.createElement('form');
    form.id = 'userProfileForm';

    this.createFormFields(form);
    this.addFormActions(form);

    const div = this.dom.div('form-container');
    div.appendChild(form);

    return div;
  }

  protected abstract addFormActions(form: HTMLFormElement): void;

  public abstract render(): HTMLElement;
}