import { C_GraphProcessor } from "./graph/C_GraphProcessor";
import { A_dijkstra } from "./C_router/A_shortest_path/dijktra";
import { C_Node, Status } from "./node/C_Node";
import { Packet } from "./Packet";
import { IclientPacket,Inode} from './ClientPacket'
import { Graph } from "./graph/Graph";
import {YenAlgro} from './C_router/A_shortest_path/YenKSP'
import {graphProccess} from './graph/Graph_Proccess/G_processor'
import initializeGraph = graphProccess.initializeGraph
import baseGraph = graphProccess.baseGraph
import { C_DCU } from "./dcu/C_DCU";
import { C_PacketProcessor } from "./dcu/C_PacketProcessor";
import E_Packet = Packet.E_Packet;


export async function Main(Adjentlist : IclientPacket[] , NodeList : Inode[]) {
    const processor: C_GraphProcessor = new C_GraphProcessor();
    const graph: Graph = new Graph();
    const StaticGraph: Graph = new Graph(); 
    const base_graph =  baseGraph (Adjentlist, NodeList)
    const childNodeList: C_Node[] = [];
    const numChildNodes = NodeList.length - 1;

        /*I. Init and solve the graph*/
    initializeGraph(graph, base_graph.vertexlist, base_graph.weight);
    initializeGraph(StaticGraph, base_graph.vertexlist, base_graph.weight);
    // processor.getGraph(graph)
    const dijktra: A_dijkstra = new A_dijkstra(base_graph.NodeIdList);
    const soureceNode = 0
    dijktra.findShortestPath(graph, soureceNode);
    // dijktra.displaySolution(graph);
    const levels = dijktra.setLevel(graph);


    console.log('[')
    for (let i = 0; i < levels.length; i++) {
        console.log ('{node '+ levels[i].node +' :' +base_graph.NodeIdList[levels[i].node] +', levelID: { level:'+levels[i].levelID.level+ ', id:'+levels[i].levelID.id+'}}')
    }
    console.log(']')
    // processor.getGraph(graph)

    // YenAlgro(graph,StaticGraph,0,12,3,base_graph.NodeIdList)

        /** II. Initiate DCU: */
    const offlineList = [1,2,6];
    const nodeList = dijktra.getGraphnode(graph)

    for (let i = 0; i < offlineList.length; i++){
        for (let j = 0; j < nodeList.length ; j ++){
            if (offlineList[i] == nodeList[j]) childNodeList.push(new C_Node(offlineList[i], Status.OFFLINE))
            else if( nodeList[j] != soureceNode) childNodeList.push(new C_Node(nodeList[j], Status.ONLINE));
        }
    }
    // for (let i = 1; i <= numChildNodes; i++) {
    //     if (offlineList.includes(i)) childNodeList.push(new C_Node(i, Status.OFFLINE));
    //     else 
    //     childNodeList.push(new C_Node(i, Status.ONLINE));
    // }
    const rootNode: C_PacketProcessor = new C_PacketProcessor(0, Status.ONLINE);
    const dcu: C_DCU = new C_DCU(rootNode);
     /** III. Construct packet: */
    const packet: E_Packet = {
        destinationNodeID: { node: rootNode, levelID: { level: 0, id: 1 } },
        data: "...",
        routing: [],
    };

    for (let i = 1; i <= levels.length -1; i++) {
        packet.routing.push({
        node: childNodeList[levels[i].node-1],
        levelID: levels[i].levelID,
        });
    }

    // console.log(packet)
    // console.log('---------Starting propagate-----')
    // const timeoutNodeList = await dcu.getPacketProcessor().propagate(packet);
    // if (timeoutNodeList.length == 0) {
    //     console.log('[TRACKING]:  Propagate Completed !!!')
    // } else {
    //     console.log("Timeout list: ");
    //     console.log(timeoutNodeList);
    // }
    // // dijktra.displaySolution(graph)
    // const a_star: A_aStrar = new A_aStrar();
    // a_star.findShortestPath(graph,0, 4)
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