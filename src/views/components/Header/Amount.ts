import { DOM } from '../../utils/DOM';
import { UserController } from '@/controllers/users.controller';

export class Amount {
  private amount: number;
  DOM = new DOM();

  /**
   * @param amount - this is total money about paid user and will calculate from API data
   */
  constructor() {
    this.amount = 0;
    this.loadTotalAmount();
  }

  private async loadTotalAmount(): Promise<void> {
    this.amount = await UserController.getTotalPaidAmount();
    this.updateDisplay();
  }

  private updateDisplay(): void {
    const amountElement = document.querySelector('.amount span');
    if (amountElement) {
      amountElement.textContent = `$${this.amount.toString()}`;
    }
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