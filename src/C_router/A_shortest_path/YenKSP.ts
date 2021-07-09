import { C_GraphProcessor } from "../../graph/C_GraphProcessor";
import { Vertex } from "../../graph/E_vertex";
import { Graph } from "../../graph/Graph";
import { A_dijkstra } from "./dijktra";
import { Decorator} from './../../graph/decorator'

import IadjencyList = Decorator.IadjencyList;

export function Passbyvalue(a, b) {
    let tmp;
    tmp = b;
    b = a;
    a = tmp;
    return a
}
export function removeFromArray (arr , elt) {
    for (let i = arr.length  -1 ; i >=0; i--){
        if (arr[i] == elt){
            arr.splice(i, 1)
        }
    }
}
export function delVertex (graph: Graph,vertex : number){
        let mainVertex : any 
        let relVertex : any
        let relEdge : any
        for (let i = 0; i < graph.adjencyList.length;i ++){
            if (graph.adjencyList[i].vertexRoot.id === vertex){
                mainVertex = graph.adjencyList[i]
                removeFromArray(graph.adjencyList,mainVertex)
                
            }
            for (let j = 0; j < graph.adjencyList[i].adjencyVertices.length; j++){
                if (graph.adjencyList[i].adjencyVertices[j].vertex.id == vertex){
                    relEdge  = graph.adjencyList[i].adjencyVertices[j]
                    removeFromArray(graph.adjencyList[i].adjencyVertices,relEdge )
                }
            }
            if (graph.adjencyList[i].adjencyVertices.length <= 0){
                relVertex = graph.adjencyList[i]
                removeFromArray(graph.adjencyList,relVertex)
                
            }
        }
}
export function   delEdge  (graph: Graph ,source: number, target: number) {
    let tempEdgeS : any 
        let tempEdgeT: any 
        for (let i = 0; i < graph.adjencyList.length;i ++){
            if (graph.adjencyList[i].vertexRoot.id === source){
                for (let j = 0; j < graph.adjencyList[i].adjencyVertices.length; j++){
                    if (graph.adjencyList[i].adjencyVertices[j].vertex.id == target){
                        tempEdgeT = graph.adjencyList[i].adjencyVertices[j]
                        removeFromArray(graph.adjencyList[i].adjencyVertices,tempEdgeT)
                    }
                }
                
            }
            if (graph.adjencyList[i].vertexRoot.id === target){
                for (let j = 0; j < graph.adjencyList[i].adjencyVertices.length; j++){
                    if (graph.adjencyList[i].adjencyVertices[j].vertex.id == source){
                        tempEdgeS = graph.adjencyList[i].adjencyVertices[j]
                        removeFromArray(graph.adjencyList[i].adjencyVertices,tempEdgeS)
                    }
                }
                
            }
        }
        return {tempEdgeT,tempEdgeS}
  }
export async function YenAlgro(SourceGraph: Graph, StaticGraph: Graph,  source : number , sink : number, K : number, NodeIdList: string[]) {
    console.log('K shortest Path from  ' +source + ' to ' + sink )
    let dijktra_rerouting: A_dijkstra = new A_dijkstra(NodeIdList);
    let reRoutingGraph: Graph = SourceGraph
    let  Graphconfig : Graph =  new Graph ()
    const ReRoutingProcessor: C_GraphProcessor = new C_GraphProcessor();
    const A = []
    A.length = K
    for (let i = 0; i <K;i++){
        A[i] = []
    }
    A [0] = dijktra_rerouting.getShortestPath(SourceGraph,source, sink)
    const potentialKpath = []; 
    // console.log('-----------First Path---------------')
    // reRoutingGraph.delEdge(3,6)
    // reRoutingGraph.delVertex(25)
    // ReRoutingProcessor.getGraph(reRoutingGraph)
    const delVertexList : number [] = []
    for (let k = 1; k <= K; k ++) {
        for (let i = 0; i < A[k-1].length -2; i++) {
            const spurNode =  A[k-1][i]
            const rootPath = A[k-1].slice(0,i)
            A.forEach((path) => {
                if (JSON.stringify(rootPath)==JSON.stringify(path.slice(0,i))){
                    //            //
                    if(path[i] !== undefined  && path[i+1] !== undefined) {
                        // reRoutingGraph.delEdge(path[i],path[ i + 1])
                        delEdge(reRoutingGraph,path[i],path[ i + 1])
                    }
                   }
            })
            rootPath.forEach((node: number) => {
                if (spurNode != node){
                    // reRoutingGraph.delVertex(node)
                    delVertex (reRoutingGraph,node)
                  }

            })

            dijktra_rerouting.reset()
            let newNodeIdList : string[] = []
            for (let i = 0;i < reRoutingGraph.adjencyList.length; i++) {
                for (let j = 0;j <NodeIdList.length;j++) {
                    if (reRoutingGraph.adjencyList[i].vertexRoot.id == j) {
                        newNodeIdList.push(NodeIdList[j])
                    }
                }
            }
            dijktra_rerouting.nodeList = NodeIdList
            let spurPath = dijktra_rerouting.getShortestPath(reRoutingGraph, spurNode, sink);
            let totalPath = rootPath.concat(spurPath)
           if (!potentialKpath.includes(totalPath)){
            potentialKpath.push(totalPath)
           }
            //    console.log(clone.adjencyList)
           
            //    ////////////////////////////////////////////////////////////////
            const clone = {...StaticGraph} as Graph
            clone.adjencyList = [...StaticGraph.adjencyList]
            for(let i = 0; i <StaticGraph.adjencyList.length; i++){
                clone.adjencyList[i].adjencyVertices = [...StaticGraph.adjencyList[i].adjencyVertices]
                for (let j = 0; j < StaticGraph.adjencyList[i].adjencyVertices.length;j++){
                    clone.adjencyList[i].adjencyVertices[j] = {...StaticGraph.adjencyList[i].adjencyVertices[j]}

                // clone.adjencyList[i].adjencyVertices[j].weight = Object.assign(graph.adjencyList[i].adjencyVertices[j])
                }
            }
            reRoutingGraph = clone
        }
        if (potentialKpath.length <=0) {
            break;
        }
        A[k] = potentialKpath[0]
        potentialKpath.shift()
    }
    console.log(A)
    return A
}