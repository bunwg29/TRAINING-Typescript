import icons from '@/constant/icons';
import { HEADER_ITEMS } from '@/constant/tableHeader';
import { DOM } from '@/views/utils/DOM';

export class Heading {
  private readonly dom: DOM;

  constructor() {
    this.dom = new DOM();
  }

  /**
   * Creates and returns the checkbox element for the header
   */
  private createCheckbox(): HTMLElement {
    const checkbox = this.dom.a('', 'checkboxMenu', '');
    const checkboxIcon = this.dom.img(
      'table-title-checkbox',
      icons.userNonCheckbox,
    );
    checkbox.appendChild(checkboxIcon);
    return checkbox;
  }

  /**
   * Creates and returns the options element for the header
   */
  private createOptions(): HTMLElement {
    const options = this.dom.p('');
    const optionsIcon = this.dom.img('viewMoreOption', icons.viewMoreOption);
    options.appendChild(optionsIcon);
    return options;
  }

  /**
   * Creates header items from the HEADER_ITEMS configuration
   */
  private createHeaderItems(): HTMLElement[] {
    return HEADER_ITEMS.map(({ className, content }) => {
      const headerItem = this.dom.p(content);
      headerItem.className = className;
      return headerItem;
    });
  }

  /**
   * Creates the complete header content
   */
  private createHeaderContent(): HTMLElement {
    const tableTitle = this.dom.div('table-title');

    const elements = [
      this.createCheckbox(),
      ...this.createHeaderItems(),
      this.createOptions(),
    ];

    elements.forEach(element => tableTitle.appendChild(element));

    return tableTitle;
  }

  /**
   * Renders the header component
   * @returns The complete header element
   */
  public render(): HTMLElement {
    return this.createHeaderContent();
  }
}
