import { C_DCU } from "./dcu/C_DCU";
import { C_PacketProcessor } from "./dcu/C_PacketProcessor";
import { Packet } from "./Packet";
import E_Packet = Packet.E_Packet;
import { C_Node, Status } from "./node/C_Node";

(async () => {
  const rootNode: C_PacketProcessor = new C_PacketProcessor(0, Status.ONLINE);
  const dcu: C_DCU = new C_DCU(rootNode);

  const childNodeList: C_Node[] = [];
  const numChildNodes = 7;

  for (let i = 1; i <= numChildNodes; i++) {
    if ([2, 6].includes(i)) childNodeList.push(new C_Node(i, Status.OFFLINE));
    else 
    childNodeList.push(new C_Node(i, Status.ONLINE));
  }

  const packet: E_Packet = {
    destinationNodeID: { node: rootNode, levelID: { level: 0, id: 1 } },
    data: "...",
    routing: [
      { node: childNodeList[0], levelID: { level: 1, id: 1 } },
      { node: childNodeList[2], levelID: { level: 2, id: 1 } },
      { node: childNodeList[1], levelID: { level: 2, id: 2 } },
      { node: childNodeList[4], levelID: { level: 1, id: 2 } },
      { node: childNodeList[3], levelID: { level: 2, id: 3 } },
      { node: childNodeList[6], levelID: { level: 1, id: 3 } },
      { node: childNodeList[5], levelID: { level: 2, id: 4 } },
    ],
  };

  for (let i = 0 ;i< packet.routing.length; i++) {
    console.log(i, packet.routing[i].node.getID(), packet.routing[i].levelID.level,packet.routing[i].levelID.id)
}
  // console.log('---------Starting propagate-----')
  // const timeoutNodeList = await dcu.getPacketProcessor().propagate(packet);
  // console.log("Timeout list: ");
  // console.log(timeoutNodeList);
})();
