import {Graph} from '../../graph/Graph'
import {IroutingPacket} from '../../graph/decorator'
const INF : number = 999
export class A_dijkstra {
    public visited : boolean[] ;
    public source: number|0 ;
    public graph: Graph;
    public dist : number [];
    public previous : number [];
    constructor(graph? : Graph) {
        this.graph = graph
      }
    findShortestPath(graph: Graph,scr: number) {
       this.source = scr
       this.init(graph,scr)

       for (let i = 0; i < graph.adjencyList.length;i ++){
        let nearest = this.getNearest(graph)
        this.visited[nearest] = true;
            for (let j = 0; j <graph.adjencyList[nearest].adjencyVertices.length;j++){
                const IdVertex: number = graph.adjencyList[nearest].adjencyVertices[j].vertex.id
                if(this.dist[IdVertex]>this.dist[nearest] + graph.adjencyList[nearest].adjencyVertices[j].weight){

                    this.dist[IdVertex] = this.dist[nearest] + graph.adjencyList[nearest].adjencyVertices[j].weight
                    this.previous[IdVertex] = nearest;
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
            while ( parnode != this.source ){
                process.stdout.write(" <--" + parnode +" ");
                parnode = this.previous[parnode];
            }
            if (i != this.source) {
                process.stdout.write(' <--'+this.source)
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

    setLevel(){
        let routing :IroutingPacket[] = []
        let counts = {};
        for (let i = 0; i < this.previous.length; i++) {
            counts[this.previous[i]] = 1 + (counts[this.previous[i]] || 0);
        }
        let sourceRoot = {
            node : this.source,
            levelID: { level: 0, id: 1}
        }
        routing.push(sourceRoot)
        let level = 0;
        while (level < Object.keys(counts).length){
            let index = 0;
        for (let i = 0; i <routing.length; i++){
            if(routing[i].levelID.level == level){
                    for (let j = 0; j <this.previous.length; j++){
                        if(routing[i].node == this.previous[j] && j != this.source){
                            let rout = {
                                node : j,
                                levelID: { level: level +1, id: ++index}
                            }
                            routing.push(rout)
                        }
                    }
            }
        }
            level ++;
        }
        return routing;
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
