import { Heading } from './Heading';
import { Navigation } from './Navigation';

export class Header {
  constructor() {}

  private HeaderContent() {
    const header = document.createElement('header');
    header.appendChild(new Heading('TABLE OF USER DATA').render());
    header.appendChild(new Navigation().render());

    return header;
  }

  public render() {
    console.log(this.HeaderContent());
    return this.HeaderContent();
  }
}
