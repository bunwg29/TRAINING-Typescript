import { DOM } from '../../utils/DOM.utils';

export class Heading {
  DOM = new DOM();

  private title: string;

  /**
   * 
   * @param title -heading of data table
   */
  constructor(title: string) {
    this.title = title;
  }

  private HeadingContent(): HTMLElement {
    const div = this.DOM.div('heading');
    div.appendChild(this.DOM.p(this.title));
    return div;
  }

  public render(): HTMLElement {
    return this.HeadingContent();
  }
}
