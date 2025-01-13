import { DOM } from '@/views/utils/DOM';

/**
 * - This class contains number of item of data, numerical order of data
 */
export class Pages {
  private readonly dom: DOM;
  private totalPages: number;
  private currentPage: number;
  private totalCount: number;

  constructor(totalPages: number, currentPage: number, totalCount: number) {
    this.dom = new DOM();
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.totalCount = totalCount;
  }

  /**
   * 
   * @returns that return numerical order of item. For example: 1-10 of 100
   */
  private rangePages(): HTMLElement {
    const first = (this.currentPage - 1) * 10 + 1;
    const last = Math.min(this.currentPage * 10, this.totalCount);
    const span = document.createElement('span');
    span.className = 'current-pages';
    span.innerText = `${first}-${last}`;
    return span;
  }

  /**
   * 
   * @returns total item of data
   */
  private totalPagesElement(): HTMLElement {
    const span = document.createElement('span');
    span.className = 'total-items';
    span.textContent = this.totalPages.toString();
    return span;
  }

  /**
   * 
   * @returns - Combine all sub component in to PagesContent()
   */
  private PagesContent(): HTMLElement {
    const div = this.dom.div('pagination-pages');
    div.appendChild(this.rangePages());
    const textNode = document.createTextNode(' of ');
    div.appendChild(textNode);
    div.appendChild(this.totalPagesElement());
    return div;
  }

  public render() {
    return this.PagesContent();
  }
}
