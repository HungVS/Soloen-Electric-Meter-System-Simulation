import {Vertex } from "./vertex/E_vertex"

export class Graph{
    public adjencyList:[ {
        vertex: Vertex,
        adjencyVertices:[{
            vertex : Vertex,
            weight: number|null
        }]
    }]| null = null;
}