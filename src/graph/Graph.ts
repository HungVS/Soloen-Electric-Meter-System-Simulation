import {Vertex } from "./vertex/E_vertex"
import {IadjencyList} from './decorator'
export class Graph{
    public adjencyList:IadjencyList[] | null = null;
    constructor() {

      }
    setAdjacencyList ( adjencyVertices: IadjencyList[]){
        this.adjencyList= adjencyVertices
    }
}