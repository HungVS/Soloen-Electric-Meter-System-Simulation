import {Graph} from './Graph'
import {Vertex} from './vertex/E_vertex'
import {IadjencyList} from './decorator'
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
                //tempadjencyList.push ({vertexRoot:tempVertex, adjencyVertices:tempadjencyVertices})
                console.log('Alone Vertex  :' + i )
                tempAloneVertex.push(tempVertex)
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
    graph.setAloneList(tempAloneVertex)
    graph.setAdjacencyList(tempadjencyList)
    //console.log(graph.adjencyList)
};


 updateGraph  (graph: Graph,start: number,end: number, weight: number)  {
    //console.log('start' + start + '  ,end : ' + end)
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










