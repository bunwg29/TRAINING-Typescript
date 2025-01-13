import { FilterState } from "@/types/Filter";
import { UserResponse } from "@/types/UserResponse";

/**
 * - That manage filter data state
 */

export class FilterManager {
  private static instance: FilterManager;
  private state: FilterState = {
    sortBy: 'default',
    userStatus: 'all',
  };
  private subscribers: ((state: FilterState) => void)[] = [];

  private constructor() { }

  public static getInstance(): FilterManager {
    if (!FilterManager.instance) {
      FilterManager.instance = new FilterManager();
    }
    return FilterManager.instance;
  }
  /**
   *
   * @returns - The state of type filter
   */
  public getState(): FilterState {
    return { ...this.state };
  }

  /**
   *
   * @param newState - This params contains state of data filter that user want
   */
  public setState(newState: Partial<FilterState>) {
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
  }

  public subscribe(callback: (state: FilterState) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }

  public filterData(data: UserResponse[]): UserResponse[] {
    let filteredData = [...data];

    // Filter by user status
    if (this.state.userStatus !== 'all') {
      filteredData = filteredData.filter(
        user =>
          user.active_status.toLowerCase() ===
          this.state.userStatus.toLowerCase(),
      );
    }

    // Sort data
    switch (this.state.sortBy) {
      case 'first-name':
        filteredData.sort((a, b) => a.firstname.localeCompare(b.firstname));
        break;
      case 'last-name':
        filteredData.sort((a, b) => a.lastname.localeCompare(b.lastname));
        break;
      case 'due-date':
        filteredData.sort(
          (a, b) =>
            new Date(a.paid_day).getTime() - new Date(b.paid_day).getTime(),
        );
        break;
      case 'last-login':
        filteredData.sort(
          (a, b) =>
            new Date(a.last_login).getTime() - new Date(b.last_login).getTime(),
        );
        break;
    }

    return filteredData;
  }
}
