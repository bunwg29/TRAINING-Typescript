import { DOM } from '../../../utils/DOM.utils';
import { ButtonCreate } from './ButtonCreate';
import { ButtonPay } from './ButtonPay';
import { Filter } from './Filter';
import { Input } from './Input';

export class TableOption {
  private readonly dom: DOM;

  constructor() {
    this.dom = new DOM();
  }

  private TableOption(): HTMLElement {
    const div = this.dom.div('menu');
    const divLeft = this.dom.div('menu-left');
    divLeft.append(new Filter().render(), new Input().render());
    const divButton = this.dom.div('menu-right');
    divButton.append(new ButtonCreate().render(), new ButtonPay().render())
    div.append(divLeft, divButton);

    return div;
  }

  public render(): HTMLElement {
    return this.TableOption();
  }
}
