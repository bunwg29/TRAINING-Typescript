import { UserResponse } from '../../controllers/users.controller';
import { TableData } from '../components/Table/TableData/TableData';

export abstract class UserView {
  protected container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.handleData();
  }

  // Abstract method for subclasses to specify the data fetching logic
  protected abstract fetchData(): Promise<UserResponse[]>;

  private initTable(users: UserResponse[]) {
    const table = new TableData(users).createTable();
    this.container.appendChild(table);
  }

  private async handleData() {
    const users = await this.fetchData();
    this.initTable(users);
  }

  public render() {
    return this.container;
  }
}
