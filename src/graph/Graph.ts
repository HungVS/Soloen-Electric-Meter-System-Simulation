import {vertex} from "./vertex/E_vertex"

export class graph{
    public adjencyList:[ {
        vertex: vertex,
        adjencyVertices:[{
            vertex : vertex,
            weight: null
        }]
    }]| null = null;
}