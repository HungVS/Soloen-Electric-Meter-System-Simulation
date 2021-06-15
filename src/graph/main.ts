import {Vertex} from './vertex/E_vertex'
import {Graph} from './Graph'
import {C_GraphProcessor} from './C_GraphProcessor'
import {A_dijkstra} from './A_shortest_path/dijktra'

(() => {
    const processor : C_GraphProcessor = new C_GraphProcessor()
    const graph : Graph = new Graph ()
    const dijktra : A_dijkstra = new A_dijkstra()
    const numberVertex = 6
    const vertexlist : Vertex[] =  []
    const weight : number []= [4,3,20, 4,2, 2,20, 3,20,5, 5,1, 20,1]
    for (let i = 0 ; i < numberVertex ; i++) {
        vertexlist.push(new Vertex(i))
    }
    vertexlist[0].addVertexAdjency([vertexlist[1],vertexlist[3],vertexlist[5]])
    vertexlist[1].addVertexAdjency([vertexlist[0],vertexlist[2]])
    vertexlist[2].addVertexAdjency([vertexlist[1],vertexlist[3]])
    vertexlist[3].addVertexAdjency([vertexlist[0],vertexlist[2],vertexlist[4]])
    vertexlist[4].addVertexAdjency([vertexlist[3],vertexlist[5]])
    vertexlist[5].addVertexAdjency([vertexlist[0],vertexlist[4]])

    processor.initializeGraph(graph,vertexlist,weight)
    processor.getGraph(graph)
    dijktra.findShortestPath(graph,0)
    dijktra.displaySolution(graph)
})()
