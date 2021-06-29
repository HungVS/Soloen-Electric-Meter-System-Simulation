import {Vertex } from "./E_vertex"
import { Decorator} from './decorator'
// import {IadjencyList} from './decorator'
import IadjencyList = Decorator.IadjencyList;
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

     getGraphNumberVertices (): number {
      let vertexNumber = 0
      for (let i = 0; i < this.adjencyList.length; i++ ){
              vertexNumber += 1; 
      }
      return  vertexNumber;
    }  

    resetGraph () {
        for (let i = 0; i < this.adjencyList.length;i ++){
            this.adjencyList[i].vertexRoot.fScore = 0;
            this.adjencyList[i].vertexRoot.gScore = 0;
            this.adjencyList[i].vertexRoot.hScore = 0;
            this.adjencyList[i].vertexRoot.previous = null;
        }
    }
}