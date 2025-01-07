import { UserView } from './UserView';

export class Paid extends UserView {
  constructor(page?: string) {
    super("paid", page);
  }
}
