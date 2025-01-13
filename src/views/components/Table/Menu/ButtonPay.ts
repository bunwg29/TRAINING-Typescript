import { payEvent } from "@/helpers/payEvent";

export class ButtonPay {
  constructor() {}

  private ButtonContent(): HTMLElement {
    const button = document.createElement('button');
    button.textContent = 'PAY DUES';
    button.className = 'menu-pay';
    payEvent(button);
    return button;
  }

  public render(): HTMLElement {
    return this.ButtonContent();
  }
}
