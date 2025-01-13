import icons from '@/constant/icons';
import { BtnPagination } from '@/helpers/pagination';
import { DOM } from '@/views/utils/DOM';

/**
 * - This class contain button for pre or next page
 */
export class Control {
  private readonly dom: DOM;
  private totalPages: number;

  constructor(totalPages: number) {
    this.dom = new DOM();
    this.totalPages = totalPages;
  }

  private createImg(src: string): HTMLElement {
    const img = document.createElement('img');
    img.src = src;
    return img;
  }

  private createButton(className: string, img: HTMLElement): HTMLElement {
    const button = document.createElement('button');
    button.className = className;
    button.appendChild(img);
    BtnPagination(button, this.totalPages);
    return button;
  }

  private ControlContent(): HTMLElement {
    const div = this.dom.div('pagination-controls');
    div.appendChild(
      this.createButton('prev-page', this.createImg(icons.previousPage)),
    );
    div.appendChild(
      this.createButton('next-page', this.createImg(icons.nextPageOption)),
    );

    return div;
  }

  public render(): HTMLElement {
    return this.ControlContent();
  }
}
