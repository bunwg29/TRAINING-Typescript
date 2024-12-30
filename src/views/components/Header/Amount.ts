import { DOM } from '../../utils/DOM';
export class Amount {
  private amount: number;

  DOM = new DOM();
  constructor(amount: number) {
    this.amount = amount;
  }

  private AmountContent() {
    return this.DOM.div('amount').appendChild(
      this.DOM.p(`Total payable amount: ${this.amount} USD`),
    );
  }

  public render() {
    return this.AmountContent();
  }
}
