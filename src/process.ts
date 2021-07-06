import { C_GraphProcessor } from "./graph/C_GraphProcessor";
import { A_dijkstra } from "./C_router/A_shortest_path/dijktra";
import { A_aStrar } from "./C_router/A_shortest_path/aStar";
import { C_PacketProcessor } from "./dcu/C_PacketProcessor";
import { C_DCU } from "./dcu/C_DCU";
import { C_Node, Status } from "./node/C_Node";
import { Packet } from "./Packet";
import { Icoords ,IclientPacket,Iedge ,Inode} from './ClientPacket'
import E_Packet = Packet.E_Packet;
import { Graph } from "./graph/Graph";
import { Vertex } from "./graph/E_vertex";

export async function Main(Adjentlist : IclientPacket[] , NodeList : Inode[]) {
    const processor: C_GraphProcessor = new C_GraphProcessor();
    const graph: Graph = new Graph();
    // console.log( Adjentlist)
    const vertexlist: Vertex[] = [];
    const weight: number[] = [];
    const NodeIdList: string[] = [];
    for (let i = 0; i <NodeList.length; i++) {
        NodeIdList.push(NodeList[i].id)
    }
    const dijktra: A_dijkstra = new A_dijkstra(NodeIdList);
    for (let i = 0; i < NodeList.length; i++) {
        vertexlist.push(new Vertex(i,NodeList[i].x,NodeList[i].y,NodeList[i].id));
    }
    for (let i = 0; i < Adjentlist.length;i++) {
        for (let j = 0; j < Adjentlist[i].adjencyVertices.length; j++) {
            weight.push(Adjentlist[i].adjencyVertices[j].dist)
        }
    }
    
    for ( let i = 0; i < Adjentlist.length;i++) {
        let tempVertexList = []
        for (let j = 0; j < Adjentlist[i].adjencyVertices.length; j++){
            const id = NodeIdList.indexOf(Adjentlist[i].adjencyVertices[j].vertex_id)
            tempVertexList.push(vertexlist[id])
        }
        // // let index = IndexNode[i]
        vertexlist[i].addVertexAdjency(tempVertexList)
        
    }
    const childNodeList: C_Node[] = [];
    const numChildNodes = NodeList.length - 1;

    for (let i = 1; i <= numChildNodes; i++) {
        childNodeList.push(new C_Node(i, Status.ONLINE));
    }
    processor.initializeGraph(graph, vertexlist, weight);
    processor.getGraph(graph)
    dijktra.findShortestPath(graph, 0);
    dijktra.displaySolution(graph);
    const levels = dijktra.setLevel();
    console.log('[')
    for (let i = 0; i < levels.length; i++) {
        console.log ('{node '+ levels[i].node +' :' +NodeIdList[levels[i].node] +', levelID: { level:'+levels[i].levelID.level+ ', id:'+levels[i].levelID.id+'}}')
    }
    console.log(']')
        /** II. Initiate DCU: */
    const offlineList = [2, 6];
    const rootNode: C_PacketProcessor = new C_PacketProcessor(0, Status.ONLINE);
    const dcu: C_DCU = new C_DCU(rootNode);
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
    // dijktra.displaySolution(graph)
    const a_star: A_aStrar = new A_aStrar();
    a_star.findShortestPath(graph,0, 4)
}
// export  function sort_adj  (Adjentlist : IclientPacket[], nodeindex : number[]){
//     let list :IclientPacket[] = []
    
//     for (let i = 0; i < Adjentlist.length ;i ++) {
//         for (let j = 0; j < Adjentlist.length; j++) {
//             if (nodeindex[i]  == Adjentlist[j].vertexRoot){
//                 list.push(Adjentlist[j])
//             }
//         }
//     }
//     return list
// }