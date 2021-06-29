import {Graph} from './Graph'
import {Vertex} from './E_vertex'
import {Decorator} from './decorator';
import IadjencyList = Decorator.IadjencyList;
export class C_GraphProcessor {
    
 initializeGraph (graph: Graph, vertexlist: Vertex[],weight: number[]) {
    let tempadjencyList:IadjencyList[] = [];
    let tempAloneVertex : Vertex [] = [];
    let weightIndex = 0
    for (let i = 0; i < vertexlist.length; i++ ){
        let tempVertex = vertexlist[i]
        let tempadjencyVertices = []
        try {
            if(!vertexlist[i].adjencyVerticesList){
                tempAloneVertex.push(tempVertex)
            }
            for (let j = 0; j < vertexlist[i].adjencyVerticesList.length; j++){ 
                tempadjencyVertices.push({vertex :vertexlist[i].adjencyVerticesList[j], weight: weight[weightIndex]})
                weightIndex += 1;
            }
            tempadjencyList.push ({vertexRoot:tempVertex, adjencyVertices:tempadjencyVertices})
        } catch (e) {
        }

    }
    graph.setAloneList(tempAloneVertex)
    graph.setAdjacencyList(tempadjencyList)
};


 updateGraph  (graph: Graph,start: number,end: number, weight: number)  {
    if(start == end) return

    const vertices = []
    const aloneVertex = []
    console.log(graph.Alone_vertex)
    for (let i = 0; i < graph.Alone_vertex.length; i++ ){
        aloneVertex.push(graph.Alone_vertex[i].id)
    }
    for (let i = 0; i < graph.adjencyList.length; i++ ){
        vertices.push(graph.adjencyList[i].vertexRoot.id)
    }
    if((vertices.includes(start) && vertices.includes(end)) || (vertices.includes(start) && aloneVertex.includes(end))){
        console.log('right ^ ^')
    }
     else {
        console.log('wrong?')
    }
}

 getGraph  (graph: Graph) {
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










