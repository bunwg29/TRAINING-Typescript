export class Input {
  constructor() {}

  private InputContent(): HTMLElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search Users by Name, Email or Date';
    input.className = 'table-option-input';
    return input;
  }

  public render() {
    return this.InputContent();
  }
}
