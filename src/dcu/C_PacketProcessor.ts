import { E_Packet } from "../E_Packet";
import { C_Node } from "../node/C_Node";

export class C_PacketProcessor extends C_Node {
  /**
   * Propagate packet to the entire network.
   */
  propagate(packet: E_Packet) {
    this.onIncommingPacket(packet);
  }
}