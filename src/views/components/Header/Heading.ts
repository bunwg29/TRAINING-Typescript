import { DOM } from '../../utils/DOM';

export class Heading {
  DOM = new DOM();

  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  private HeadingContent() {
    const div = this.DOM.div('heading');
    div.appendChild(this.DOM.p(this.title));
    return div;
  }

  public render() {
    return this.HeadingContent();
  }
}
