import { UserView } from './UserView';

export class Unpaid extends UserView {
  constructor(page?: string) {
    super("unpaid", page);
  }
}
