import { UserResponse } from '@/controllers/users.controller';
import { Heading } from './Heading';
import icons from '@/constant/icons';
import { DOM } from '@/views/utils/DOM';
import { Activity } from './Activity';

type StatusType = 'active' | 'payment';

interface StatusConfig {
  className: string;
  formatter?: (date: string) => string;
}

interface StatusConfigs {
  [key: string]: {
    [key: string]: StatusConfig;
  };
}

export class TableData {
  private readonly dom: DOM;
  private activity: Activity;

  private readonly statusConfigs: StatusConfigs = {
    active: {
      Active: { className: 'info-activity__active' },
      Inactive: { className: 'info-activity__inactive' },
    },
    payment: {
      Paid: {
        className: 'info-payment__paid',
        formatter: (date: string) => `Paid on ${date}`,
      },
      Unpaid: {
        className: 'info-payment__unpaid',
        formatter: (date: string) => `Unpaid on ${date}`,
      },
      Overdue: {
        className: 'info-payment__overdue',
        formatter: (date: string) => `Dued on ${date}`,
      },
    },
  };

  constructor(private readonly data: UserResponse[]) {
    this.dom = new DOM();
    this.activity = new Activity();
  }

  public createTable(): HTMLElement {
    const container = this.dom.div('table-data');
    container.appendChild(new Heading().render());
    container.appendChild(this.createTableBody());
    return container;
  }

  private createTableBody(): HTMLElement {
    const usersContainer = this.dom.div('user');
    this.data.forEach(user => {
      usersContainer.appendChild(this.createUserRow(user));
    });
    return usersContainer;
  }

  private createUserRow(user: UserResponse): HTMLElement {
    const listUser = this.dom.div('list-user');
    const userInfo = this.dom.div('info');

    const elements = [
      this.createCheckbox(),
      this.createShowInfoButton(),
      this.createUserInfoSection(user),
      this.createActivitySection(user),
      this.createPaymentSection(user),
      this.createAmountSection(user),
      this.createViewMoreButton(),
      this.createAdditionSection(),
    ];

    elements.forEach(element => userInfo.appendChild(element));
    listUser.appendChild(userInfo);
    listUser.appendChild(this.activity.render(user.activity));
    return listUser;
  }

  private createCheckbox(): HTMLElement {
    const checkbox = document.createElement('a');
    checkbox.className = 'checkbox';
    checkbox.appendChild(this.dom.img('', icons.userNonCheckbox));
    return checkbox;
  }

  private createShowInfoButton(): HTMLElement {
    const showInfo = document.createElement('a');
    showInfo.className = 'showinfo';
    showInfo.appendChild(this.dom.img('', icons.showProfile));
    return showInfo;
  }

  private createUserInfoSection(user: UserResponse): HTMLElement {
    const container = this.dom.div('info-name');

    const name = this.dom.div('info-name__firstname');
    name.textContent = `${user.firstname} ${user.lastname}`;

    const email = this.dom.div('info-name__email');
    email.textContent = user.email;

    container.append(name, email);
    return container;
  }

  private getStatusConfig(type: StatusType, status: string): StatusConfig {
    return (
      this.statusConfigs[type]?.[status] || {
        className: `info-${type}__null`,
      }
    );
  }

  private createActivitySection(user: UserResponse): HTMLElement {
    const container = this.dom.div('info-activity');

    const statusConfig = this.getStatusConfig('active', user.active_status);
    const activeStatus = this.createStatusElement(
      statusConfig.className,
      user.active_status,
    );

    const loginInfo = this.dom.div('info-activity__login');
    loginInfo.appendChild(this.dom.p(`Last login: ${user.last_login}`));

    container.append(activeStatus, loginInfo);
    return container;
  }

  private createPaymentSection(user: UserResponse): HTMLElement {
    const container = this.dom.div('info-payment');

    const statusConfig = this.getStatusConfig('payment', user.paid_status);
    const paidStatus = this.createStatusElement(
      statusConfig.className,
      user.paid_status,
    );

    const paymentDay = this.createPaymentStatus(
      'info-payment__day',
      user.paid_status,
      user.paid_day,
    );

    container.append(paidStatus, paymentDay);
    return container;
  }

  private createAmountSection(user: UserResponse): HTMLElement {
    const container = this.dom.div('info-amount');

    const amount = document.createElement('span');
    amount.className = 'info-amount__money';
    amount.textContent = user.amount;

    const currency = this.dom.p('USD');

    container.append(amount, currency);
    return container;
  }

  private createViewMoreButton(): HTMLElement {
    return this.dom.button('button-viewmore', 'View more');
  }

  private createAdditionSection(): HTMLElement {
    const container = this.dom.div('addition');
    const link = document.createElement('a');
    link.className = 'viewmore';
    link.appendChild(this.dom.img('', icons.viewMoreOption));
    container.appendChild(link);
    return container;
  }

  private createStatusElement(className: string, status: string): HTMLElement {
    const container = this.dom.div(className);

    const statusDot = document.createElement('span');
    statusDot.className = 'status-dot';
    statusDot.textContent = '•';

    container.append(statusDot, ` ${status}`);
    return container;
  }

  private createPaymentStatus(
    className: string,
    status: string,
    date: string,
  ): HTMLElement {
    const container = this.dom.div(className);
    const statusConfig = this.getStatusConfig('payment', status);
    container.textContent = statusConfig.formatter?.(date) || '';
    return container;
  }
}
