import { E_Packet } from "../E_Packet";

export class C_INode {
  /**
   * Called by other nodes to send packet to this node.
   * @param packet
   * @return            Status.
   */
  onIncommingPacket(packet: E_Packet) {
    // TODO
  }

  /**
   * Send the specified packet to the specified node.
   * @param node
   * @param packet
   */
  sendTo(node: C_INode, packet: E_Packet) {
    node.onIncommingPacket(packet);
  }
}
