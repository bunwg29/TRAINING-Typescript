import icons from '@/constant/icons';
import { DOM } from '@/views/utils/DOM';

export class Input {
  private readonly dom: DOM;

  constructor() {
    this.dom = new DOM();
  }

  private InputContent(): HTMLElement {
    const divMenuLeftSearch = this.dom.div('menu-left-search');
    const iconSearch = this.dom.img('search-bar', icons.searchOption);
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search Users by Name, Email or Date';
    divMenuLeftSearch.append(iconSearch, input);

    return divMenuLeftSearch;
  }

  public render() {
    return this.InputContent();
  }
}
