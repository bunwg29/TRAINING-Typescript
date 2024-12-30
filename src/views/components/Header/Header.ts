import { Heading } from './Heading';
import { Navigation } from './Navigation';
/**
 * This class will render all about content of header of page by combine other components 
 * class and put in <header></header>
 */
export class Header {
  constructor() {}

  private HeaderContent(): HTMLElement {
    const header = document.createElement('header');
    header.appendChild(new Heading('TABLE OF USER DATA').render());
    header.appendChild(new Navigation().render());

    return header;
  }

  public render(): HTMLElement {
    return this.HeaderContent();
  }
}
