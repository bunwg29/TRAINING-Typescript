import { UserResponse } from '@/controllers/users.controller';

export class SearchManager {
  private static instance: SearchManager;
  private searchTerm: string = '';
  private subscribers: ((searchTerm: string) => void)[] = [];

  private constructor() {}

  public static getInstance(): SearchManager {
    if (!SearchManager.instance) {
      SearchManager.instance = new SearchManager();
    }
    return SearchManager.instance;
  }

  public getSearchTerm(): string {
    return this.searchTerm;
  }

  public setSearchTerm(term: string) {
    this.searchTerm = term;
    this.notifySubscribers();
  }

  public subscribe(callback: (searchTerm: string) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.searchTerm));
  }

  public searchData<T extends UserResponse>(data: T[]): T[] {
    if (!this.searchTerm.trim()) return data;

    const searchTerm = this.searchTerm.toLowerCase().trim();

    return data.filter(user => {
      const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
      const email = user.email.toLowerCase();
      const date = new Date(user.paid_day).toLocaleDateString();

      return (
        fullName.includes(searchTerm) ||
        email.includes(searchTerm) ||
        date.includes(searchTerm)
      );
    });
  }
}
