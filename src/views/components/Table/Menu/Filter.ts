import { DOM } from '@/views/utils/DOM';
import icons from '../../../../constant/icons';

export class Filter {
  private readonly dom: DOM;

  constructor() {
    this.dom = new DOM();
  }

  private FilterContent(): HTMLElement {
    const button = document.createElement('button');
    button.className = 'menu-left-filter';

    const img = this.dom.img('filter-icon', icons.filter);
    const p = this.dom.p('Filter');

    button.append(img, p);
    return button;
  }

  public render(): HTMLElement {
    return this.FilterContent();
  }
}
