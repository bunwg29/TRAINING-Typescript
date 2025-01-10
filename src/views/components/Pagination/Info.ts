import { DOM } from '@/views/utils/DOM.utils';
const optionValue = ['10', '20', '50'];

export class Info {
  private readonly dom: DOM;
  constructor() {
    this.dom = new DOM();
  }

  private createSpan(): HTMLElement {
    const span = document.createElement('span');
    span.className = 'pagination-info__content';
    span.textContent = 'Rows per page: ';
    return span;
  }

  private createSelect(): HTMLElement {
    const select = document.createElement('select');
    select.className = 'items-per-page';
    optionValue.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
    return select;
  }

  private InfoContent(): HTMLElement {
    const div = this.dom.div('pagination-info');
    div.appendChild(this.createSpan());
    div.appendChild(this.createSelect());
    return div;
  }

  public render(): HTMLElement {
    return this.InfoContent();
  }
}
