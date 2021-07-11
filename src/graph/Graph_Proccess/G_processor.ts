import { Vertex } from "../E_vertex";
import { Graph } from "../Graph"
import { Decorator } from "../decorator";
import IadjencyList = Decorator.IadjencyList;
import { IclientPacket, Inode } from "../../ClientPacket";
export namespace graphProccess {
    export function baseGraph (Adjentlist : IclientPacket[] , NodeList : Inode[]) {
        let vertexlist: Vertex[] = [];
        const weight: number[] = [];
        const NodeIdList: string[] = [];
        for (let i = 0; i <NodeList.length; i++) {
            NodeIdList.push(NodeList[i].id)
        }
        for (let i = 0; i < NodeList.length; i++) {
            vertexlist.push(new Vertex(i,NodeList[i].x,NodeList[i].y,NodeList[i].id));
        }
        for ( let i = 0; i < Adjentlist.length;i++) {
            let tempVertexList = []
            for (let j = 0; j < Adjentlist[i].adjencyVertices.length; j++){
                const id = NodeIdList.indexOf(Adjentlist[i].adjencyVertices[j].vertex_id)
                tempVertexList.push(vertexlist[id])
            }
            vertexlist[i].addVertexAdjency(tempVertexList)
            
        }
        for (let i = 0; i < Adjentlist.length;i++) {
            for (let j = 0; j < Adjentlist[i].adjencyVertices.length; j++) {
                weight.push(Adjentlist[i].adjencyVertices[j].dist)
            }
        }
        return { vertexlist :vertexlist,weight,NodeIdList}
    }
    export function CloneGraph (graph: Graph){
        const clone = {...graph} as Graph
            clone.adjencyList = [...graph.adjencyList]
            for(let i = 0; i <graph.adjencyList.length; i++){
                clone.adjencyList[i].adjencyVertices = [...graph.adjencyList[i].adjencyVertices]
                for (let j = 0; j < graph.adjencyList[i].adjencyVertices.length;j++){
                    clone.adjencyList[i].adjencyVertices[j] = {...graph.adjencyList[i].adjencyVertices[j]}
                }
            }
        return clone
    }
    export function removeFromArray (arr , elt) {
        for (let i = arr.length  -1 ; i >=0; i--){
            if (arr[i] == elt){
                arr.splice(i, 1)
            }
        }
    }
    export function  getGraph  (graph: Graph) {
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
    export function initializeGraph (graph: Graph, vertexlist: Vertex[],weight: number[]) {
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
}