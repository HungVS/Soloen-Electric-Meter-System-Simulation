import {Vertex } from "./E_vertex"
import { Decorator} from './decorator'
// import {IadjencyList} from './decorator'
import IadjencyList = Decorator.IadjencyList;
import IadjencyVertices = Decorator.IadjencyVertices;
export class Graph{
    public Alone_vertex!: Vertex[];
    public adjencyList:IadjencyList[] | null = null;
    constructor() {

      }
    
      setAloneList(arr :Vertex[]){
          this.Alone_vertex = arr
      }

      setAdjacencyList ( adjencyVertices: IadjencyList[]){
        this.adjencyList= adjencyVertices
    }
    delVertex (vertex:number){
        let mainVertex : any 
        let relVertex : any
        let relEdge : any
            for (let i = 0; i < this.adjencyList.length;i ++){
                if (this.adjencyList[i].vertexRoot.id === vertex){
                    mainVertex = this.adjencyList[i]
                    this.removeFromArray(this.adjencyList,mainVertex)
                    
                }
                for (let j = 0; j < this.adjencyList[i].adjencyVertices.length; j++){
                    if (this.adjencyList[i].adjencyVertices[j].vertex.id == vertex){
                        relEdge  = this.adjencyList[i].adjencyVertices[j]
                        this.removeFromArray(this.adjencyList[i].adjencyVertices,relEdge )
                    }
                }
                if (this.adjencyList[i].adjencyVertices.length <= 0){
                    relVertex = this.adjencyList[i]
                    this.removeFromArray(this.adjencyList,relVertex)
                    
                }
            }
            return {mainVertex,relVertex,relEdge}
    }
    delEdge (source: number, target: number){
        let tempEdgeS : any 
        let tempEdgeT: any 
        for (let i = 0; i < this.adjencyList.length;i ++){
            if (this.adjencyList[i].vertexRoot.id === source){
                for (let j = 0; j < this.adjencyList[i].adjencyVertices.length; j++){
                    if (this.adjencyList[i].adjencyVertices[j].vertex.id == target){
                        tempEdgeT = this.adjencyList[i].adjencyVertices[j]
                        this.removeFromArray(this.adjencyList[i].adjencyVertices,tempEdgeT)
                    }
                }
                
            }
            if (this.adjencyList[i].vertexRoot.id === target){
                for (let j = 0; j < this.adjencyList[i].adjencyVertices.length; j++){
                    if (this.adjencyList[i].adjencyVertices[j].vertex.id == source){
                        tempEdgeS = this.adjencyList[i].adjencyVertices[j]
                        this.removeFromArray(this.adjencyList[i].adjencyVertices,tempEdgeS)
                    }
                }
                
            }
        }
        return {tempEdgeT,tempEdgeS}
    }
    removeFromArray (arr , elt) {
        for (let i = arr.length  -1 ; i >=0; i--){
            if (arr[i] == elt){
                arr.splice(i, 1)
            }
        }
    }
     getGraphNumberVertices (): number {
      let vertexNumber = 0
      for (let i = 0; i < this.adjencyList.length; i++ ){
              vertexNumber += 1; 
      }
      return  vertexNumber;
    }  

    resetGraph () {
        for (let i = 0; i < this.adjencyList.length;i ++){
            // this.adjencyList[i].vertexRoot.fScore = 0;
            // this.adjencyList[i].vertexRoot.gScore = 0;
            // this.adjencyList[i].vertexRoot.hScore = 0;
            this.adjencyList[i].vertexRoot.previous = null;
        }
    }
}