import {Graph} from './Graph'
import {Vertex} from './vertex/E_vertex'
import {IadjencyList} from './decorator'
export class C_GraphProcessor {
    
 initializeGraph (graph: Graph, vertexlist: Vertex[],weight: number[]) {
    let tempadjencyList:IadjencyList[] = [];
    let weightIndex = 0
    for (let i = 0; i < vertexlist.length; i++ ){
        let tempVertex = vertexlist[i]
        let tempadjencyVertices = []
        try {
            if(!vertexlist[i].adjencyVerticesList){
                //tempadjencyList.push ({vertexRoot:tempVertex, adjencyVertices:tempadjencyVertices})
                console.log('Alone Vertex  :' + i )
            }
            for (let j = 0; j < vertexlist[i].adjencyVerticesList.length; j++){ 
                tempadjencyVertices.push({vertex :vertexlist[i].adjencyVerticesList[j], weight: weight[weightIndex]})
                weightIndex += 1;
            }
            tempadjencyList.push ({vertexRoot:tempVertex, adjencyVertices:tempadjencyVertices})
        } catch (e) {
           // console.log('Exist vertex does not adjent any vertex')
        }

    }
    graph.setAdjacencyList(tempadjencyList)
    //console.log(graph.adjencyList)
};


 updateGraph  (graph: Graph,start: number,end: number, weight: number)  {
    for (let i = 0; i < graph.adjencyList.length; i++ ){
        if(graph.adjencyList[i].vertexRoot.id != start ||graph.adjencyList[i].vertexRoot.id != end){

            console.log('Cannot connect if one of the vertices is not connected to the graph.')
            break
        }
    }
}

 getGraph  (graph: Graph) {
    console.log('Tracking graph :')
    for (let i = 0; i < graph.adjencyList.length; i++ ){
        console.log('Root of adjacency list :')
        console.log( graph.adjencyList[i].vertexRoot.id +' <---{')
        try {
            for (let j = 0; j < graph.adjencyList[i].adjencyVertices.length; j++){
                console.log('  { vertex :'+graph.adjencyList[i].adjencyVertices[j].vertex.id +','+'weight: '+graph.adjencyList[i].adjencyVertices[j].weight +' }')
            }
        }
        catch (e) {
            console.log('Exist vertex does not adjent any vertex')
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










