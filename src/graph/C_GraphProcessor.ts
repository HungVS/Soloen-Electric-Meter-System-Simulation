import {Graph} from './Graph'
import {Vertex} from './vertex/E_vertex'
import {IadjencyList} from './decorator'
export class C_GraphProcessor {
    
 initializeGraph (graph: Graph, vertexlist: Vertex[],weight: number[]) {
    let tempadjencyList:IadjencyList[] = [];
    for (let i = 0; i < vertexlist.length; i++ ){
        let tempVertex = vertexlist[i]
        let tempadjencyVertices = []
        for (let j = 0; j < vertexlist[i].adjencyVerticesList.length; j++){
            tempadjencyVertices.push({vertex :vertexlist[i].adjencyVerticesList[j], weight: 1})
        }
        tempadjencyList.push ({vertexRoot:tempVertex, adjencyVertices:tempadjencyVertices})
    }
    graph.setAdjacencyList(tempadjencyList)
    console.log(graph.adjencyList)
};


 updateGraph  ()  {

}

 getGraph  (graph: Graph) {
    for (let i = 0; i < graph.adjencyList.length; i++ ){
        console.log(graph.adjencyList[i].vertexRoot)
        for (let j = 0; j < graph.adjencyList[i].adjencyVertices.length; j++){
        }
    }
}

 inspectingGraph  ()  {
    
}
 removeEdge () {

}

 removeVertex () {

}
}










