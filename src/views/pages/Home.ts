import {
  UserController,
  UserResponse,
} from '../../controllers/users.controller';
import { TableData } from '../components/Table/TableData/TableData';

export class Home {
  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.handleData();
  }

  private initTable(users: UserResponse[]) {
    const table = new TableData(users).createTable();
    this.container.appendChild(table);
  }

  async handleData() {
    const users = await UserController.getAllUsers();
    this.initTable(users);
    return users;
  }

  public render() {
    return this.container;
  }
}
