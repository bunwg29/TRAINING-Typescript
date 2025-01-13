import { DOM } from '../../utils/DOM';
import { Amount } from './Amount';
import { NAV_CONTENT } from '../../../constant/navContent';

export class Navigation {
  DOM = new DOM();
  constructor() { }

  private NavigationContent(): HTMLElement {
    const nav = document.createElement('nav');
    NAV_CONTENT.forEach(item => {
      nav.appendChild(this.DOM.a(item.href, 'nav-item', item.title));
    });
    return nav;
  }

  private divNav(): HTMLElement {
    const div = this.DOM.div('navigation');
    div.appendChild(this.NavigationContent());
    div.appendChild(new Amount().render());
    return div;
  }

  public render(): HTMLElement {
    return this.divNav();
  }
}
