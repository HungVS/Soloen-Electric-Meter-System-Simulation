import { Packet } from "../Packet";
import E_Packet = Packet.E_Packet;
import E_NodeID = Packet.E_NodeID;
import E_LevelID = Packet.E_LevelID;

export enum Status {
  ONLINE,
  OFFLINE,
}

export class C_Node {
  private readonly id: number;
  private readonly status: Status; /** Only use in simulation to mock errors. */

  constructor(id: number, status: Status) {
    this.id = id;
    this.status = status;
  }

  async delay(ms: number) {
    return await new Promise((res) =>
      setTimeout(() => {
        res(0);
      }, ms)
    );
  }

  /**
   * Called by other nodes to send packet to this node.
   * @param packet
   * @return            Status.
   */
  async onIncommingPacket(packet: E_Packet): Promise<number[]> {
    console.log(packet);
    if (this.status == Status.OFFLINE) {
      await this.delay(4000);
      return [];
    }
		
    const routing = packet.routing;
    if (!routing.length) return [];
    const packets: E_Packet[] = [];
    const nextLevel = packet.destinationNodeID.levelID.level + 1;

    let constructingRouting: E_NodeID[] =
      []; /** The routing is being constructed */

    let count = 0;
    routing.forEach((nodeID) => {
      const level = nodeID.levelID.level;
      if (level != nextLevel || ++count == 1) constructingRouting.push(nodeID);
      else {
        this.addPacket(packets, packet, constructingRouting);
        constructingRouting = [nodeID];
      }
    });

    this.addPacket(packets, packet, constructingRouting);
    constructingRouting = [];

    const timeoutNodeList = await this.sendMany(packets);
    return timeoutNodeList;
  }

  /**
   * Send all constructed packets to the corresponding nodes.
   * @param packets All constructed packets.
   * @returns            Timeout node list.
   */
  private async sendMany(packets: E_Packet[]) {
    const timeoutNodeList: number[] = [];

    for (const packet of packets) {
      const res = await this.sendTo(packet.destinationNodeID.node, packet);
      timeoutNodeList.push(...(res as unknown as number[]));
    }

    return timeoutNodeList;
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
      routing: constructingRouting.slice(1, constructingRouting.length),
    });
  }

  /**
   * Send the specified packet to the specified node.
   * @param node
   * @param packet
   */
  async sendTo(node: C_Node, packet: E_Packet): Promise<number[]> {
    let timeoutNodeList = [];
    await Promise.race([
      node.onIncommingPacket(packet).then((res) => {
        timeoutNodeList = res;
      }),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("timeout")),
          (packet.routing.length + 1) * 3e3 /** Amount of timeout depends on number of packets to be sent. */
        )
      ),
    ]).catch(function (err) {
      const timeoutNodeID = packet.destinationNodeID.node.id;
      console.error(`[ERROR]: timeout - node ${timeoutNodeID}`);
      timeoutNodeList.push(timeoutNodeID);
    });

    return timeoutNodeList;
  }

  getID() {
    return this.id;
  }
}
