import icons from '../../../../constant/icons';

export class Filter {
  constructor() {}

  private FilterContent(): HTMLElement {
    const button = document.createElement('button');
    button.textContent = 'Filter';
    button.className = 'table-option-filter';
    const img = document.createElement('img');
    img.src = icons.filter;
    button.appendChild(img);
    return button;
  }

  public render(): HTMLElement {
    return this.FilterContent();
  }
}
