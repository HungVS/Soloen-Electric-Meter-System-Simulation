import { Vertex } from "./vertex/E_vertex";

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
