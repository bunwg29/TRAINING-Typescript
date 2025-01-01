import { Body } from "./Body";
import { Heading } from "./Heading";

export class TableData extends Body {
  constructor(name: string, email: string, userStatus: string, lastLogin: string, paymentStatus: string, paymentDate: string, amount: number) {
    super(name, email, userStatus, lastLogin, paymentStatus, paymentDate, amount);
  }


  private TableDataContent(): HTMLElement {
    const table = document.createElement('table');
    table.appendChild(new Heading().render());
    table.appendChild(super.BodyContent());
    return table;
  }

  public render(): HTMLElement {
    return this.TableDataContent();
  }
}