const heading = ['NAME', 'USER STATUS', 'PAYMENT STATUS', 'AMOUNT'];
import icons from '@/constant/icons';
import { DOM } from '@/views/utils/DOM';

export class Heading {
  DOM = new DOM();
  constructor() {}

  /**
   *
   * @param content - The content of the table header cell
   * @returns - The table header cell element
   */
  private createTableHeaderCell(content: string): HTMLTableCellElement {
    const th = document.createElement('th');
    th.textContent = content;
    return th;
  }

  /**
   *
   * @returns - The table header element
   */
  private createHeaderContent(): HTMLElement {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.className = 'table-heading';

    // Icon header
    headerRow.appendChild(
      this.DOM.th(this.DOM.img('table-heading-img', icons.userNonCheckbox)),
    );

    // Table headers
    heading.forEach(head => {
      const th = this.createTableHeaderCell(head);
      headerRow.appendChild(th);
    });

    // Edit button
    const editButton = this.DOM.button('td-button-edit', '');
    editButton.appendChild(
      this.DOM.img('td-button-edit-img', icons.viewMoreOption),
    );
    headerRow.appendChild(this.DOM.th(editButton));

    thead.appendChild(headerRow);
    return thead;
  }

  /**
   *
   * @returns - The table header element
   */
  public render(): HTMLElement {
    return this.createHeaderContent();
  }
}
