import { Packet } from "../Packet";
import E_Packet = Packet.E_Packet;
import { C_Node } from "../node/C_Node";

export class C_PacketProcessor extends C_Node {
  /**
   * Propagate packet to the entire network.
   */
  async propagate(packet: E_Packet): Promise<number[]> {
    const timeoutNodeList = await this.onIncommingPacket(packet);
    return timeoutNodeList;
  }
}
