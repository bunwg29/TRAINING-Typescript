const heading = ['NAME', 'USER STATUS', 'PAYMENT STATUS', 'AMOUNT'];

export class Heading {

  constructor() {
    this.render();
  }

  private HeaderContent(): HTMLElement {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.className = 'table-heading';
    heading.forEach(head => {
      const th = document.createElement('th');
      th.textContent = head;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    return thead;
  }

  public render(): HTMLElement {
    return this.HeaderContent();
  }

}
