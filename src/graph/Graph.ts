import {Vertex } from "./vertex/E_vertex"
import {IadjencyList} from './decorator'
export class Graph{
    public adjencyList:IadjencyList[] | null = null;
    constructor() {

      }
    setAdjacencyList ( adjencyVertices: IadjencyList[]){
        this.adjencyList= adjencyVertices
    }

     getGraphNumberVertices (): number {
      let vertexNumber = 0
      for (let i = 0; i < this.adjencyList.length; i++ ){
          // for (let j = 0; j < this.adjencyList[i].adjencyVertices.length; j++){
              vertexNumber += 1; 
          // }
      }
      return  vertexNumber;
  }  
}