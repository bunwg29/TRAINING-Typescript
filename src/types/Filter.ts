/**
 * - Contain type of state filter data or type of data when get from API
 */

export type StatusType = 'active' | 'payment';

export interface StatusConfig {
  className: string;
  formatter?: (date: string) => string;
}

export interface StatusConfigs {
  [key: string]: {
    [key: string]: StatusConfig;
  };
}

export interface FilterOption {
  value: string;
  label: string;
  checked?: boolean;
}

export interface FilterState {
  sortBy: string;
  userStatus: string;
}

export type FetchType = 'all' | 'paid' | 'unpaid' | 'overdue';