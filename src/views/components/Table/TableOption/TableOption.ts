import { DOM } from '../../../utils/DOM';
import { Button } from './Button';
import { Filter } from './Filter';
import { Input } from './Input';

export class TableOption {
  DOM = new DOM();
  constructor() {}

  private TableOption(): HTMLElement {
    const div = this.DOM.div('table-option');
    div.append(
      new Filter().render(),
      new Input().render(),
      new Button().render()
    );

    return div;
  }

  public render(): HTMLElement {
    return this.TableOption();
  }
}
