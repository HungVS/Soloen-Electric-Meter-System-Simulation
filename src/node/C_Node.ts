import { E_Packet } from "../E_Packet";

export class C_Node {
  private readonly id: number;
  private levelID: string;
  private adjacencyList: C_Node[];

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

    const routing = packet.routing.trim();
    if (routing == "") return;
    const levelIDList = packet.routing.trim().split(" ");

    const packets: E_Packet[] = [];
    const nextLevel = String(
      parseInt(packet.levelIDDestination.split(".")[0]) + 1
    );

    let constructingLevelIDList: string[] = [];

    let count = 0;
    levelIDList.forEach((levelID) => {
      const level = levelID.split(".")[0];
      if (level != nextLevel || ++count == 1)
        constructingLevelIDList.push(levelID);
      else {
				this.addPacket(packets, packet, constructingLevelIDList)
				constructingLevelIDList = [levelID];
      }
    });

		this.addPacket(packets, packet, constructingLevelIDList)
    constructingLevelIDList = [];

   this.sendMany(packets)
  }

	/**
	 * Send all constructed packets to the corresponding nodes.
	 * @param packets All constructed packets.
	 */
	private sendMany(packets: E_Packet[]) {
		packets.forEach((packet) => {
      const levelIDDestination = packet.levelIDDestination;
      for (let i = 0; i < this.adjacencyList.length; i++) {
        const nextNode = this.adjacencyList[i];
        if (nextNode.levelID == levelIDDestination) {
          this.sendTo(nextNode, packet);
          break;
        }
      }
    });
	}

	/**
	 * Add new packet to the packet list which will be sent to the next level nodes.
	 * @param packets The packet list
	 * @param incommingPacket The received packet.
	 * @param constructingLevelIDList The constructing level ID list.
	 */
  private addPacket(
    packets: E_Packet[],
    incommingPacket: E_Packet,
    constructingLevelIDList: string[]
  ) {
    packets.push({
      levelIDStarting: incommingPacket.levelIDDestination,
      levelIDDestination: constructingLevelIDList[0],
      data: incommingPacket.data,
      routing: constructingLevelIDList
        .slice(1, constructingLevelIDList.length)
        .join(" "),
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

  setAdjacencyList(adjacencyList: C_Node[]) {
    this.adjacencyList = adjacencyList;
  }

  getID() {
    return this.id;
  }

  setLevelID(id: string) {
    this.levelID = id;
  }

  getLevelID() {
    return this.levelID;
  }
}
