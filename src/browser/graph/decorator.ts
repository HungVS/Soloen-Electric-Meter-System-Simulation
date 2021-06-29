import { Vertex } from "./E_vertex";

export namespace Decorator {
    export interface IadjencyVertices {
        vertex:Vertex
        weight:number
    }
    export interface IadjencyList {
        vertexRoot:Vertex,
        adjencyVertices : IadjencyVertices []
    }
    
    export interface IroutingPacket {
        
            node : number,
            levelID: { level: number, id: number}
    }
} 

