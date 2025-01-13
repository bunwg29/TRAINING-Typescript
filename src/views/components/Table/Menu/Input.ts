import icons from '@/constant/icons';
import { SearchManager } from '@/services/SearchManager';
import { DOM } from '@/views/utils/DOM';

export class Input {
  private readonly dom: DOM;
  private searchManager: SearchManager;
  private debounceTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.dom = new DOM();
    this.searchManager = SearchManager.getInstance();
  }

  private handleSearch(input: HTMLInputElement) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.searchManager.setSearchTerm(input.value);
    }, 300);
  }

  private InputContent(): HTMLElement {
    const divMenuLeftSearch = this.dom.div('menu-left-search');
    const iconSearch = this.dom.img('search-bar', icons.searchOption);
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search Users by Name, Email or Date';
    input.addEventListener('input', () => this.handleSearch(input));
    divMenuLeftSearch.append(iconSearch, input);
    return divMenuLeftSearch;
  }

  public render() {
    return this.InputContent();
  }
}
