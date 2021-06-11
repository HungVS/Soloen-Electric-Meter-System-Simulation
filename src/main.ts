import {C_DCU} from "./dcu/C_DCU"
import { C_PacketProcessor } from "./dcu/C_PacketProcessor";
import { E_Packet } from "./E_Packet";
import { C_Node } from "./node/C_Node";

(() => {

	const rootNode: C_PacketProcessor = new C_PacketProcessor(0);
	const dcu: C_DCU = new C_DCU(rootNode);
	
	const testRouting: string = "1.1 2.1 2.2 1.2 2.3 1.3 2.4"

	const childNodeList: C_Node[] = []
	const numChildNodes = 7

	for(let i = 0; i < numChildNodes; i++) {
		childNodeList.push(new C_Node(i))
	}

	// TODO: auto-generate map.

	childNodeList[0].setLevelID("1.1")
	childNodeList[1].setLevelID("1.2")
	childNodeList[2].setLevelID("1.3")
	childNodeList[3].setLevelID("2.1")
	childNodeList[4].setLevelID("2.2")
	childNodeList[5].setLevelID("2.3")
	childNodeList[6].setLevelID("2.4")

	rootNode.setAdjacencyList([childNodeList[0], childNodeList[1], childNodeList[2]])
	childNodeList[0].setAdjacencyList([rootNode, childNodeList[3], childNodeList[4]])
	childNodeList[1].setAdjacencyList([rootNode, childNodeList[5]])
	childNodeList[2].setAdjacencyList([rootNode, childNodeList[6]])

	const packet:E_Packet = {
		levelIDStarting: "",
		levelIDDestination: "0.1",
		data: "...",
		routing: testRouting
	}

	dcu.getPacketProcessor().propagate(packet)
})()
