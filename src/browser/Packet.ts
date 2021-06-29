import { C_Node } from "./node/C_Node";

export namespace Packet {
  export class E_Packet {
    readonly startingNodeID?: E_NodeID;
    readonly destinationNodeID: E_NodeID = new E_NodeID;
    readonly data!: string;
    readonly routing: E_NodeID[] = [];
  }

  export class E_NodeID {
    readonly levelID: E_LevelID = new E_LevelID;
    readonly node!: C_Node;
  }

  export class E_LevelID {
    readonly level!: number;
    readonly id!: number;
  }
}
