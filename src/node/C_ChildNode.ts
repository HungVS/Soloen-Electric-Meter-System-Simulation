import { C_INode } from "./C_INode";

class ChildNode extends C_INode {

  private readonly id: number;

  constructor(id: number) {
    super();
    this.id = id;
  }

  getID() {
	  return this.id;
  }
}
