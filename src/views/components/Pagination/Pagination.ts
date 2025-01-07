import { DOM } from '@/views/utils/DOM';
import { Info } from './Info';
import { Pages } from './Pages';
import { Control } from './Control';

/**
 * -This class will combine Control.ts, Info.ts, Pages.ts into Pagination component
 */
export class Pagination {
  private dom: DOM;
  private totalPages: number;
  private currentPage: number;
  private totalCount: number;

  constructor(totalPages: number, currentPage: number, totalCount: number) {
    this.dom = new DOM();
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.totalCount = totalCount;
  }

  private PaginationContent(): HTMLElement {
    const footer = document.createElement('footer');
    footer.className = 'pagination-container';
    footer.append(
      new Info().render(),
      new Pages(this.totalPages, this.currentPage, this.totalCount).render(), 
      new Control(Math.ceil(this.totalPages / 10)).render()
    );
    return footer;
  }

  public render(): HTMLElement {
    return this.PaginationContent();
  }
}
