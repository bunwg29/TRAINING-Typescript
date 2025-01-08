import { UserResponse } from '../../controllers/users.controller';
import { TableData } from '../components/Table/TableData/TableData';
import { Pagination } from '../components/Pagination/Pagination';
import { UserController } from '@/controllers/users.controller';
import { FilterManager } from '@/services/FilterManager.services';
import { SearchManager } from '@/services/SearchManager.services';

type FetchType = 'all' | 'paid' | 'unpaid' | 'overdue';

export abstract class UserView {
  protected container: HTMLDivElement;
  private tableContainer: HTMLDivElement;
  private fetchType: FetchType;
  private page: number;
  private totalCount: number;
  protected data: UserResponse[] = [];
  private filterManager: FilterManager;
  private searchManager: SearchManager;
  private unsubscribeFilter: (() => void) | null = null;
  private unsubscribeSearch: (() => void) | null = null;

  constructor(fetchType: FetchType, page?: string) {
    // Initialize containers
    this.container = document.createElement('div');
    this.tableContainer = document.createElement('div');
    this.tableContainer.className = 'table-container';
    this.container.appendChild(this.tableContainer);

    // Initialize properties
    this.fetchType = fetchType;
    this.page = page ? parseInt(page, 10) : 1;
    this.totalCount = 0;

    // Initialize managers
    this.filterManager = FilterManager.getInstance();
    this.searchManager = SearchManager.getInstance();
  }

  private async fetchData(): Promise<{users: UserResponse[], totalCount: number}> {
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
    return response;
  }

  private async handleData() {
    try {
      // Fetch and store data
      const response = await this.fetchData();
      this.data = response.users;
      this.totalCount = response.totalCount;

      // Initial render
      this.renderProcessedData();
      this.renderPagination();

      // Subscribe to changes
      this.setupSubscriptions();
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately (e.g., show error message to user)
    }
  }

  private setupSubscriptions() {
    // Unsubscribe from existing subscriptions
    this.cleanupSubscriptions();

    // Subscribe to filter changes
    this.unsubscribeFilter = this.filterManager.subscribe(() => {
      this.renderProcessedData();
    });

    // Subscribe to search changes
    this.unsubscribeSearch = this.searchManager.subscribe(() => {
      this.renderProcessedData();
    });
  }

  private renderProcessedData() {
    try {
      // Apply both filter and search
      let processedData = this.data;
      
      // Apply filter
      processedData = this.filterManager.filterData(processedData);
      
      // Apply search
      if (this.searchManager.getSearchTerm()) {
        processedData = this.searchManager.searchData(processedData);
      }

      // Update table
      this.tableContainer.innerHTML = '';
      this.initTable(processedData);
    } catch (error) {
      console.error('Error processing data:', error);
      // Handle error appropriately
    }
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

  private cleanupSubscriptions() {
    if (this.unsubscribeFilter) {
      this.unsubscribeFilter();
      this.unsubscribeFilter = null;
    }
    if (this.unsubscribeSearch) {
      this.unsubscribeSearch();
      this.unsubscribeSearch = null;
    }
  }

  public async render() {
    await this.handleData();
    return this.container;
  }

  public destroy() {
    this.cleanupSubscriptions();
  }
}