import { DOM } from '../../utils/DOM';
export class Amount {
  private amount: number;

  DOM = new DOM();
  /**
   *
   * @param amount - this is total money about paid user and will calculate from API data
   */
  constructor(amount: number) {
    this.amount = amount;
  }

  private AmountContent(): HTMLElement {
    const div = this.DOM.div('amount');
    const span = document.createElement('span');
    span.textContent = `$${this.amount.toString()}`;

    const p = this.DOM.p(`Total payable amount: `);
    p.append(span);
    p.append(' USD');
    div.appendChild(p);
    return div;
  }

  public render(): HTMLElement {
    return this.AmountContent();
  }
}
