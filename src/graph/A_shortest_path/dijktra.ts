import {Graph} from '../Graph'
import {Vertex} from '../vertex/E_vertex'

const INF : number = 999
let source : number = 0
export class A_dijkstra {
    public visited : boolean[] ;
    //public src: number|0 ;
    public graph: Graph;
    public dist : number [];
    public previous : number [];
    constructor(graph? : Graph) {
        this.graph = graph
      }
    findShortestPath(graph: Graph,scr: number) {
       source = scr
    //    console.log(source)
       this.init(graph,scr)
    //    console.log(this.visited)
    //    console.log(this.previous)
    //    console.log(this.dist)

       for (let i = 0; i < graph.adjencyList.length;i ++){
        let nearest = this.getNearest(graph)
        this.visited[nearest] = true;
            for (let j = 0; j <graph.adjencyList[nearest].adjencyVertices.length;j++){
                const IdVertex: number = graph.adjencyList[nearest].adjencyVertices[j].vertex.id
                if(this.dist[IdVertex]>this.dist[nearest] + graph.adjencyList[nearest].adjencyVertices[j].weight){

                    this.dist[IdVertex] = this.dist[nearest] + graph.adjencyList[nearest].adjencyVertices[j].weight
                    this.previous[IdVertex] = nearest;
                    // console.log(" Parent :" + this.previous)
                    // console.log(" Distance :" + this.dist)
                }
            }
       } 
    }

    displaySolution (graph: Graph) {
        console.log('\n')
        console.log (' Dijktra Algrorithm ')
        console.log("Node :\t \t\t Cost :\t\t\t  Path ");
        for (let i = 0; i < graph.adjencyList.length; i ++ ){
            process.stdout.write( +i+"\t\t\t "+this.dist[i]+"\t\t\t"+" ")
            process.stdout.write(" " +i+" ")
            let parnode = this.previous[i];
            while ( parnode != source ){
                process.stdout.write(" <--" + parnode +" ");
                parnode = this.previous[parnode];
            }
            if (i != source) {
                process.stdout.write(' <--'+source)
            }
            console.log('\n');
        }
        console.log ('============================================');
        console.log('\n')
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
        this.previous = tempPar
    }
}