import { UserResponse } from '../../controllers/users.controller';
import { TableData } from '../components/Table/TableData/TableData';
import { Pagination } from '../components/Pagination/Pagination';
import { UserController } from '@/controllers/users.controller';
import { FilterManager } from '@/services/FilterManager.services';

type FetchType = 'all' | 'paid' | 'unpaid' | 'overdue';

export abstract class UserView {
  protected container: HTMLDivElement;
  private tableContainer: HTMLDivElement;
  private fetchType: FetchType;
  private page: number;
  private totalCount: number;
  protected data: UserResponse[] = [];
  private filterManager: FilterManager;
  private unsubscribe: (() => void) | null = null;

  constructor(fetchType: FetchType, page?: string) {
    this.container = document.createElement('div');
    this.tableContainer = document.createElement('div');
    this.tableContainer.className = 'table-container';
    this.container.appendChild(this.tableContainer);
    this.fetchType = fetchType;
    this.page = page ? parseInt(page, 10) : 1;
    this.totalCount = 0;
    this.filterManager = FilterManager.getInstance();
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
    this.data = response.users;
    return response.users;
  }

  private async handleData() {
    const users = await this.fetchData();
    this.data = users;
    this.renderFilteredData();
    this.renderPagination();

    // Subscribe to filter changes
    this.unsubscribe = this.filterManager.subscribe(() => {
      this.renderFilteredData();
    });
  }

  private renderFilteredData() {
    const filteredUsers = this.filterManager.filterData(this.data);
    this.tableContainer.innerHTML = '';
    this.initTable(filteredUsers);
  }

  private initTable(users: UserResponse[]) {
    const table = new TableData(users).createTable();
    this.tableContainer.appendChild(table);
  }

  protected renderPagination() {
    const totalPages = Math.ceil(this.totalCount);
    const pagination = new Pagination(totalPages, this.page, this.totalCount);
    this.container.appendChild(pagination.render());
  }

  public async render() {
    await this.handleData();
    return this.container;
  }

  public destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
