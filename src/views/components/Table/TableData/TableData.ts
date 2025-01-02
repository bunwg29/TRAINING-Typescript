import { UserResponse } from '@/controllers/users.controller';
import { Heading } from './Heading';
import icons from '@/constant/icons';
import { DOM } from '@/views/utils/DOM';

/*
 * - This class will render content of table by will create method to create component of table and then combine them
 */
export class TableData {
  data: UserResponse[];

  DOM = new DOM();
  /**
   *
   * @param data - data of user that defined type in UserResponse at controllers/users.controller.ts
   */
  constructor(data: UserResponse[]) {
    this.data = data;
  }

  /**
   *
   * @returns - table element that contain all of the user data
   */
  public createTable() {
    const table = document.createElement('table');
    table.classList.add('user-table');

    table.appendChild(new Heading().render());

    // Create body rows
    const tbody = this.createTableBody();
    table.appendChild(tbody);

    return table;
  }

  /**
   * - This will create a div that contains two p elements, purpose of this method is easier style the content
   * @param className -This is class name of div
   * @param firstContent - This is content of first p element
   * @param secondContent - This is content of second p element
   * @returns
   */
  private createDoubleDiv(
    className: string,
    firstContent: string,
    secondContent: string,
  ): HTMLElement {
    const div = this.DOM.div(className);
    const p1 = this.DOM.p(firstContent);
    const p2 = this.DOM.p(secondContent);
    div.append(p1, p2);

    return div;
  }

  /**
   * - This will create a div that contains two img elements, purpose of this method is easier style the content
   * @param className -This is class name of div
   * @param firstSrc - This is src of first img element
   * @param secondSrc - This is src of second img element
   * @returns
   */
  private createIcon(
    className: string,
    firstSrc: string,
    secondSrc: string,
  ): HTMLElement {
    const div = this.DOM.div(className);
    const firstImg = document.createElement('img');
    const secondImg = document.createElement('img');

    firstImg.src = firstSrc;
    secondImg.src = secondSrc;

    div.append(firstImg, secondImg);
    return div;
  }

  /**
   * - This is also like createDoubleDiv but have some logic to add content before secondContent params
   * @param className
   * @param firstContent
   * @param secondContent
   * @returns
   */
  private createPaymentStatus(
    className: string,
    firstContent: string,
    secondContent: string,
  ): HTMLElement {
    const div = this.DOM.div(className);

    const formattedContent =
      firstContent === 'Paid'
        ? `Paid on ${secondContent}`
        : firstContent === 'Overdue'
          ? `Dued on ${secondContent}`
          : firstContent === 'Unpaid'
            ? `Unpaid on ${secondContent}`
            : '';
    const p1 = this.DOM.p(firstContent);
    const p2 = this.DOM.p(formattedContent);
    div.append(p1, p2);

    return div;
  }

  /**
   *
   * @returns - This will create a table body that contain all of the user data
   */
  private createTableBody() {
    const tbody = document.createElement('tbody');

    this.data.forEach((user: UserResponse) => {
      const row = document.createElement('tr');
      row.appendChild(
        this.createCell(
          this.createIcon('td-icon', icons.userNonCheckbox, icons.showProfile),
        ),
      );
      row.appendChild(
        this.createCell(
          this.createDoubleDiv(
            'td-name',
            user.firstname + ' ' + user.lastname,
            user.email,
          ),
        ),
      );
      row.appendChild(
        this.createCell(
          this.createDoubleDiv(
            'td-user-status',
            user.active_status,
            user.last_login,
          ),
        ),
      );
      row.appendChild(
        this.createCell(
          this.createPaymentStatus(
            'td-paid-status',
            user.paid_status,
            user.paid_day,
          ),
        ),
      );
      row.appendChild(
        this.createCell(this.createDoubleDiv('td-amount', user.amount, 'USD')),
      );

      row.appendChild(this.createCell(this.DOM.button('td-button-view', 'View More')));
      const editButton = this.DOM.button('td-button-edit', '');
      editButton.appendChild(this.DOM.img('', icons.viewMoreOption));
      row.appendChild(this.createCell(editButton));
      tbody.appendChild(row);
    });

    return tbody;
  }

  /**
   * - This will create a cell that contain content
   * @param content - This is content that will be append to cell
   * @returns
   */
  private createCell(content: HTMLElement) {
    const cell = document.createElement('td');
    cell.append(content);
    return cell;
  }
}
