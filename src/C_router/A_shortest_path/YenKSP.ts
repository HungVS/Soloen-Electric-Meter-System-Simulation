import { Graph } from "../../graph/Graph";
import { A_dijkstra } from "./dijktra";
import { graphProccess} from './../../graph/Graph_Proccess/G_processor';
import delVertex = graphProccess.delVertex
import delEdge = graphProccess.delEdge
import CloneGraph = graphProccess.CloneGraph
import getGraph = graphProccess.getGraph

export async function YenAlgro(SourceGraph: Graph, StaticGraph: Graph,  source : number , sink : number, K : number, NodeIdList: string[]) {
    console.log('K shortest Path from  ' +source + ' to ' + sink )
    let dijktra_rerouting: A_dijkstra = new A_dijkstra(NodeIdList);
    let reRoutingGraph: Graph = SourceGraph
    const A = []
    A.length = K
    for (let i = 0; i <K;i++){
        A[i] = []
    }
    A [0] = dijktra_rerouting.getShortestPath(SourceGraph,source, sink)
    const potentialKpath = []; 
    const delVertexList : number [] = []
    for (let k = 1; k <= K; k ++) {
        for (let i = 0; i < A[k-1].length -2; i++) {
            const spurNode =  A[k-1][i]
            const rootPath = A[k-1].slice(0,i)
            A.forEach((path) => {
                if (JSON.stringify(rootPath)==JSON.stringify(path.slice(0,i))){
                    //            //
                    if(path[i] !== undefined  && path[i+1] !== undefined) {
                        delEdge(reRoutingGraph,path[i],path[ i + 1])
                    }
                   }
            })
            rootPath.forEach((node: number) => {
                if (spurNode != node){
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
            reRoutingGraph = CloneGraph(StaticGraph)
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