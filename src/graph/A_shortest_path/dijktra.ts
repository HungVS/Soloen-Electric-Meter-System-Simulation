import {Graph} from '../Graph'
import {Vertex} from '../vertex/E_vertex'

const INF : number = 999

export class A_dijkstra {
    public visited : boolean[] ;
    //public src: number|0 ;
    public graph: Graph;
    public dist : number [];
    public parent : number [];
    constructor(graph? : Graph) {
        this.graph = graph
      }
    findShortestPath(graph: Graph,scr: number){
       this.init(graph,scr)
       console.log(this.visited)
       console.log(this.parent)
       console.log(this.dist)

    //    let nearest = this.getNearest(graph,scr )
    //    console.log('The nearest is :'+ nearest)
    //    this.visited[scr] = true
    //    this.dist[nearest] = this.dist[scr] + graph.adjencyList[scr].adjencyVertices[nearest].weight
    //    console.log(this.dist)
    //    console.log(this.visited)

       for (let i = 0; i < graph.adjencyList.length;i ++){
        let nearest = this.getNearest(graph)
        this.visited[nearest] = true;
        for (let j = 0; j <graph.adjencyList[i].adjencyVertices.length;j++){
            var IdVertex: number = graph.adjencyList[nearest].adjencyVertices[j].vertex.id           
            var y: number = +IdVertex;
            console.log(IdVertex)
            const test : number = graph.adjencyList[nearest].adjencyVertices[j].weight      
            this.dist[5] = this.dist[nearest] + graph.adjencyList[nearest].adjencyVertices[j].weight
            // if(this.dist[IdVertex]>this.dist[nearest] + graph.adjencyList[nearest].adjencyVertices[j].weight){
            //     this.dist[IdVertex] = this.dist[nearest] + graph.adjencyList[nearest].adjencyVertices[j].weight
            // }
            //console.log(this.dist[IdVertex])
        }
       }
       console.log(this.dist)
    //    for (let i = 0; i < graph.adjencyList.length; i++){
    //        let nearest = this.getNearest(graph,scr )
    //        this.visited[nearest] = true
    //        console.log(this.visited)
    //        for (let adjency = 0; adjency < graph.adjencyList[i].adjencyVertices.length; adjency++){
    //            const IdVertex = graph.adjencyList[i].adjencyVertices[adjency].vertex.id

    //            console.log(this.dist[IdVertex])
    //            this.dist [IdVertex] = this.dist[i]+ graph.adjencyList[i].adjencyVertices[adjency].weight
    //         //console.log('  { vertex :'+graph.adjencyList[nearest].adjencyVertices[adjency].vertex.id +','+'weight: '+graph.adjencyList[nearest].adjencyVertices[adjency].weight +' }')
    //         //    if (this.dist[IdVertex]> this.dist[nearest]+ graph.adjencyList[nearest].adjencyVertices[adjency].weight){
    //         //     //&& 
    //         //        this.dist [IdVertex] = this.dist[nearest]+ graph.adjencyList[nearest].adjencyVertices[adjency].weight
    //         //        //this.parent[adjency] = nearest;
    //         //        //console.log(this.parent)
    //         //        //console.log(graph.adjencyList[nearest].adjencyVertices[adjency].vertex.id)
    //         //    }
    //         //console.log('  { vertex :'+graph.adjencyList[i].adjencyVertices[j].vertex.id +','+'weight: '+graph.adjencyList[i].adjencyVertices[j].weight +' }')
    //     }
    //     console.log(this.dist)
    // } 
    }

    displaySolution (graph: Graph,scr: number) {
        console.log("Node :\t \t\t Cost :\t\t\t Path ");
    for (let i = 0; i < graph.adjencyList.length; i ++ ){
        console.log( +i+"\t\t\t "+this.dist[i]+"\t\t\t"+" ")
        // console.log(" " +i+" ")
        let parnode = this.parent[i];

        // while ( parnode != scr ){
        //     console.log(" <--" + parnode +" ")
        //      parnode = this.parent[parnode];
        // }
        //console.log('\n');
    }
    }
    getNearest(graph: Graph) : number{
        let minval = INF;
        let minnode = 0;
        for (let i = 0; i < graph.adjencyList.length; i ++) {
            if (!this.visited[i] && this.dist[i] < minval){
                minval = this.dist[i];
                minnode = i;
            }
        }
     return minnode ;
    }

    init (graph: Graph,scr: number) {
        let temp: boolean [] = []
        let tempDist : number[] = []
        let tempPar : number[] = []
        for (let i = 0; i < graph.adjencyList.length; i++){
            tempPar.push(i)
            tempDist.push(INF)
            temp.push(false)
        }
        tempDist[scr] = 0
        this.visited = temp
        this.dist = tempDist
        this.parent = tempPar
    }
}