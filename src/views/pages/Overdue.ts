import { UserView } from './UserView';

export class Overdue extends UserView {
  constructor(page?: string) {
    super("overdue", page);
  }
}
