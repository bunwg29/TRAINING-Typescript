// Define notification message types for better type safety
export type NotificationKey = 
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'userAdded'
  | 'userUpdated'
  | 'userDeleted'
  | 'loadError'
  | 'saveError'
  | 'networkError'
  | 'notUser'
  | 'paymentExist'
  | 'paymentUpdate'
  | 'paymentFailed'

