export const endPoint = {

  // [GET] all user type
  getAllUser(): string {
    return `/user_data`;
  },

  /**
   * [GET] paid user
   * @param userType - this is type of user that we want to get data like: paid, unpaid, overdue user.
   * @returns 
   */
  getUserType(userType: string): string {
    return `/user_data?paid_status=${userType}`;
  }, 

  /**
   * 
   * @param userType - this is type of user that we want to get data like: paid, unpaid, overdue user.
   * @param element - this is element that we want to sort
   * @param sortType - this is type of sort: ascending or descending
   * @returns 
   */
  getSortUser(userType: string = 'all', element: string, sortType: string = 'asc'): string {
    return `/user_data?active_status=${userType}&_sort=${element}&_order=${sortType}`
  }

};

