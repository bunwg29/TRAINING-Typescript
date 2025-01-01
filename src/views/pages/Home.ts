import { TableData } from "../components/Table/TableData/TableData";

export class Home {
  constructor() {

  };

  public render() : HTMLElement {
    return new TableData("bun","dkjf","paid","sldkjf","asdlkj", "asdkjfh", 123).render();
  }
};