import { DOM } from '../../../utils/DOM';
import { Button } from './Button';
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
    div.append(divLeft, new Button().render());

    return div;
  }

  public render(): HTMLElement {
    return this.TableOption();
  }
}
