import { DOM } from "../../../utils/DOM";

export class Body {
  DOM = new DOM();
  private name: string;
  private email: string;
  private userStatus: string;
  private lastLogin: string;
  private paymentStatus: string;
  private paymentDate: string;
  private amount: number;
  
  public constructor(name: string, email: string, userStatus: string, lastLogin: string, paymentStatus: string, paymentDate: string, amount: number) {
    this.name = name;
    this.email = email;
    this.userStatus = userStatus;
    this.lastLogin = lastLogin;
    this.paymentStatus = paymentStatus;
    this.paymentDate = paymentDate;
    this.amount = amount;
  }

  private nameContent(): HTMLElement {
    const tableData = this.DOM.td('name-col');
    const name = this.DOM.p(this.name);
    const email = this.DOM.p(this.email);
    tableData.append(name, email);

    return tableData;
  };

  private userStatusContent(): HTMLElement {
    const tableData = this.DOM.td('user-status-col');
    const userStatus = this.DOM.p(this.userStatus);
    const lastLogin = this.DOM.p(this.lastLogin);
    tableData.append(userStatus, lastLogin);

    return tableData;
  };

  private paymentStatusContent(): HTMLElement {
    const tableData = this.DOM.td('payment-status-col');
    const paymentStatus = this.DOM.p(this.paymentStatus);
    const paymentDate = this.DOM.p(this.paymentDate);
    tableData.append(paymentStatus, paymentDate);

    return tableData;
  };

  private amountContent(): HTMLElement {
    const tableData = this.DOM.td('amount-col');
    const amount = this.DOM.p(this.amount.toString());
    const currency = this.DOM.p('USD');
    tableData.append(amount, currency);

    return tableData;
  };
  

  public BodyContent(): HTMLElement {
    const tbody = document.createElement('tbody');
    const tableRow = this.DOM.tr('table-row');
    tableRow.append(this.nameContent(), this.userStatusContent(), this.paymentStatusContent(), this.amountContent());
    tbody.appendChild(tableRow);

    return tbody;
  }

  public render(): HTMLElement {
    return this.BodyContent();
  };
}