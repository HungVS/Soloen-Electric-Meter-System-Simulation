import {Graph} from './Graph'
import {Vertex} from './vertex/E_vertex'
import {IadjencyList} from './decorator'
export class C_GraphProcessor {
    
 initializeGraph (graph: Graph, vertexlist: Vertex[],weight: number[]) {
    let tempadjencyList:IadjencyList[] = [];
    let weight_index = 0
    for (let i = 0; i < vertexlist.length; i++ ){
        let tempVertex = vertexlist[i]
        let tempadjencyVertices = []
        for (let j = 0; j < vertexlist[i].adjencyVerticesList.length; j++){ 
            tempadjencyVertices.push({vertex :vertexlist[i].adjencyVerticesList[j], weight: weight[weight_index]})
            weight_index += 1;
        }
        tempadjencyList.push ({vertexRoot:tempVertex, adjencyVertices:tempadjencyVertices})
    }
    graph.setAdjacencyList(tempadjencyList)
    //console.log(graph.adjencyList)
};


 updateGraph  ()  {

}

 getGraph  (graph: Graph) {
    console.log('Tracking graph :')
    for (let i = 0; i < graph.adjencyList.length; i++ ){
        console.log('Root of adjacency list :')
        console.log( graph.adjencyList[i].vertexRoot.id +' <---{')
        for (let j = 0; j < graph.adjencyList[i].adjencyVertices.length; j++){
            console.log('  { vertex :'+graph.adjencyList[i].adjencyVertices[j].vertex.id +','+'weight: '+graph.adjencyList[i].adjencyVertices[j].weight +' }')
        }
        console.log('}')
    }
}

 inspectingGraph  ()  {
    
}
 removeEdge () {

}

 removeVertex () {

}
}










