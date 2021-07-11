import { Graph } from "./graph/Graph";
import { Vertex } from "./graph/E_vertex";
import { C_GraphProcessor } from "./graph/C_GraphProcessor";
import { A_dijkstra } from "./C_router/A_shortest_path/dijktra";
import { A_aStrar } from "./C_router/A_shortest_path/aStar";
import { C_PacketProcessor } from "./dcu/C_PacketProcessor";
import { C_DCU } from "./dcu/C_DCU";
import { C_Node, Status } from "./node/C_Node";
import { Packet } from "./Packet";
import E_Packet = Packet.E_Packet;

(async () => {
  /** I. Initiate graph: */
  const processor: C_GraphProcessor = new C_GraphProcessor();
  const graph: Graph = new Graph();
  const dijktra: A_dijkstra = new A_dijkstra();
  const a_star: A_aStrar = new A_aStrar();
  const numVertices = 8;
  const vertexlist: Vertex[] = [];
  const weight: number[] = [
    4, 3, 20, 1, 4, 2, 2, 20, 3, 20, 5, 5, 1, 20, 1, 99, 99, 1,
  ];
  for (let i = 0; i < numVertices; i++) {
    vertexlist.push(new Vertex(i));
  }
  vertexlist[0].addVertexAdjency([
    vertexlist[1],
    vertexlist[3],
    vertexlist[5],
    vertexlist[7],
  ]);
  vertexlist[1].addVertexAdjency([vertexlist[0], vertexlist[2]]);
  vertexlist[2].addVertexAdjency([vertexlist[1], vertexlist[3]]);
  vertexlist[3].addVertexAdjency([vertexlist[0], vertexlist[2], vertexlist[4]]);
  vertexlist[4].addVertexAdjency([vertexlist[3], vertexlist[5]]);
  vertexlist[5].addVertexAdjency([vertexlist[0], vertexlist[4], vertexlist[6]]);
  vertexlist[6].addVertexAdjency([vertexlist[5]]);
  vertexlist[7].addVertexAdjency([vertexlist[0]]);

  processor.initializeGraph(graph, vertexlist, weight);
  // processor.updateGraph(graph, 9, 9, 1);
  processor.getGraph(graph)
  dijktra.findShortestPath(graph, 0);
  dijktra.displaySolution(graph)
  const levels = dijktra.setLevel(graph);
  console.log(levels)

  /** II. Initiate DCU: */
  const offlineList = [2, 6];
  const rootNode: C_PacketProcessor = new C_PacketProcessor(0, Status.ONLINE);
  const dcu: C_DCU = new C_DCU(rootNode);

  const childNodeList: C_Node[] = [];
  const numChildNodes = numVertices-1;

  for (let i = 1; i <= numChildNodes; i++) {
    // if (offlineList.includes(i))
    //   childNodeList.push(new C_Node(i, Status.OFFLINE));
    // else
     childNodeList.push(new C_Node(i, Status.ONLINE));
  }
  console.log(childNodeList)

  /** III. Construct packet: */
  const packet: E_Packet = {
    destinationNodeID: { node: rootNode, levelID: { level: 0, id: 1 } },
    data: "...",
    routing: [],
  };

  for (let i = 1; i <= levels.length -1; i++) {
    console.log(levels[i].node)
    console.log('-------------')
    // console.log(childNodeList[levels[i].node].getID())
    console.log(i)
    packet.routing.push({
      node: childNodeList[levels[i].node-1],
      levelID: levels[i].levelID,
    });
  }
  console.log('---------Starting propagate-----')
  const timeoutNodeList = await dcu.getPacketProcessor().propagate(packet);
  if (timeoutNodeList.length == 0) {
    console.log('[TRACKING]:  Propagate Completed !!!')
  } else {
    console.log("Timeout list: ");
    const timeout : number[] = [];
    console.log(timeoutNodeList);
  }
})();
