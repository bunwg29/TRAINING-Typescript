export const endPoint = {

  /**
   * 
   * @returns -endpoint of total data
   */
  getAll(): string {
    return '/user_data';
  },

  // [GET] all user type
  getAllUser(page: number): string {
    return `/user_data?_page=${page}`;
  },

  /**
   * [GET] paid user
   * @param userType - this is type of user that we want to get data like: paid, unpaid, overdue user.
   * @returns 
   */
  getUserType(userType: string, page: number): string {
    return `/user_data?paid_status=${userType}&_page=${page}`;
  }, 


  /**
   * [GET]
   * @returns - endpoint of user that have 'Paid' type
   */
  getPaidAmount(): string {
    return '/user_data/?paid_status=Paid';
  },

  /**
   * 
   * @param userId - userId 
   * @returns - endpoint of particular user
   */
  getUserById(userId: number | string): string {
    return `/user_data/${userId}`;
  }

};

