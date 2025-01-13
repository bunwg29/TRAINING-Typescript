
import { Header } from '../components/Header/Header';
import { TableOption } from '../components/Table/Menu/TableOption';

// This class is a layout that will be used to render the default layout of the application.
export class Default {
  constructor() {}

  /**
   *
   * @param component - This is HTML Element that will be wrapped in a div with the class name 'component'.
   * @returns {HTMLElement} - Returns a div element with the class name 'component'.
   */
  private divComponent(component: HTMLElement): HTMLElement {
    const div = document.createElement('div');
    div.className = 'component';
    div.replaceChildren(component);

    return div;
  }

  /**
   *
   * @param childComponent - This is HTML Element that will be wrapped in a div with the class name 'root'.
   * @returns {HTMLElement} - Returns a div element with the class name 'root'.
   */
  private DefaultContent(childComponent?: HTMLElement): HTMLElement {
    const divDefault = document.createElement('div');
    divDefault.className = 'root';

    const main = document.createElement('main');
    main.appendChild(new TableOption().render());
    main.appendChild(this.divComponent(childComponent as HTMLElement));

    divDefault.appendChild(new Header().render());
    divDefault.appendChild(main);

    return divDefault as HTMLElement;
  }

  /**
   *
   * @param childComponent - This is HTML Element that will be wrapped in a div with the class name 'root'.
   * @returns {HTMLElement} - Returns a div element with the class name 'root'.
   */
  public render(childComponent?: HTMLElement): HTMLElement {
    return this.DefaultContent(childComponent as HTMLElement);
  }
}
