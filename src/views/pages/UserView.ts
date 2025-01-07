import { UserResponse } from '../../controllers/users.controller';
import { TableData } from '../components/Table/TableData/TableData';
import { Pagination } from '../components/Pagination/Pagination';
import { UserController } from '@/controllers/users.controller';

type FetchType = 'all' | 'paid' | 'unpaid' | 'overdue';

export abstract class UserView {
  protected container: HTMLDivElement;
  private fetchType: FetchType;
  private page: number;
  private totalCount: number;

  constructor(fetchType: FetchType, page?: string) {
    this.container = document.createElement('div');
    this.fetchType = fetchType;
    this.page = page ? parseInt(page, 10) : 1;
    this.totalCount = 0;
  }

  private async fetchData(): Promise<UserResponse[]> {
    let response;
    switch (this.fetchType) {
      case 'paid':
        response = await UserController.getPaidUser(this.page);
        break;
      case 'unpaid':
        response = await UserController.getUnpaid(this.page);
        break;
      case 'overdue':
        response = await UserController.getOverdue(this.page);
        break;
      default:
        response = await UserController.getAllUsers(this.page);
    }
    this.totalCount = response.totalCount;
    return response.users;
  }

  private async handleData() {
    const users = await this.fetchData();
    this.initTable(users);
    this.renderPagination();
  }

  private initTable(users: UserResponse[]) {
    const table = new TableData(users).createTable();
    this.container.appendChild(table);
  }

  private renderPagination() {
    const totalPages = Math.ceil(this.totalCount);
    const pagination = new Pagination(totalPages, this.page, this.totalCount);
    this.container.appendChild(pagination.render());
  }

  public async render() {
    await this.handleData();
    return this.container;
  }
}
