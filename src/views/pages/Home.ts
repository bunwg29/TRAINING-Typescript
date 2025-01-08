import { UserView } from './UserView';

export class Home extends UserView {
  constructor(page?: string) {
    super('all', page);
  }
}
