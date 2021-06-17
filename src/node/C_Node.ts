import { Packet } from "../Packet";
import E_Packet = Packet.E_Packet;
import E_NodeID = Packet.E_NodeID;
import E_LevelID = Packet.E_LevelID;

export class C_Node {
  private readonly id: number;

  constructor(id: number) {
    this.id = id;
  }

  /**
   * Called by other nodes to send packet to this node.
   * @param packet
   * @return            Status.
   */
  onIncommingPacket(packet: E_Packet) {
    console.log(packet);

		const routing = packet.routing;
		if(!routing.length) return;
    const packets: E_Packet[] = [];
    const nextLevel = packet.destinationNodeID.levelID.level + 1;

    let constructingRouting: E_NodeID[] = []; /** The routing is being constructed */

    let count = 0;
    routing.forEach(nodeID => {
      const level = nodeID.levelID.level
      if (level != nextLevel || ++count == 1)
        constructingRouting.push(nodeID);
      else {
				this.addPacket(packets, packet, constructingRouting)
				constructingRouting = [nodeID];
      }
    });

		this.addPacket(packets, packet, constructingRouting)
    constructingRouting = [];

   this.sendMany(packets)
  }

	/**
	 * Send all constructed packets to the corresponding nodes.
	 * @param packets All constructed packets.
	 */
	private sendMany(packets: E_Packet[]) {
		packets.forEach((packet) => {
      this.sendTo(packet.destinationNodeID.node, packet)
    });
	}

	/**
	 * Add new packet to the packet list which will be sent to the next level nodes.
	 * @param packets The packet list
	 * @param incommingPacket The received packet.
	 * @param constructingRouting The constructing routing.
	 */
  private addPacket(
    packets: E_Packet[],
    incommingPacket: E_Packet,
    constructingRouting: E_NodeID[]
  ) {
    packets.push({
      startingNodeID: incommingPacket.destinationNodeID,
      destinationNodeID: constructingRouting[0],
      data: incommingPacket.data,
      routing: constructingRouting.slice(1, constructingRouting.length)
    });
  }

  /**
   * Send the specified packet to the specified node.
   * @param node
   * @param packet
   */
  sendTo(node: C_Node, packet: E_Packet) {
    node.onIncommingPacket(packet);
  }

  getID() {
    return this.id;
  }
}
