import {Graph} from '../../graph/Graph'
import { Decorator} from '../../graph/decorator'
import IroutingPacket = Decorator.IroutingPacket
const INF : number = 9999999
export class A_dijkstra {
    public visited : boolean[] ;
    public nodeList : string[];
    public source: number|0 ;
    public dist : number [];
    public previous : number [];
    constructor(nodeList?: string [] ) {
        this.nodeList = nodeList
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
        console.log("Node :\t \t\t Cost :\t\t\t\t\t\t  Path ");
        console.log('\n');
        for (let i = 0; i < graph.adjencyList.length; i ++ ){
            if (i ==0 ) {
                process.stdout.write(this.nodeList[i] +"\t\t\t "+this.dist[i]+"\t\t\t\t\t\t  "+" ")
                process.stdout.write(" " + this.nodeList[i]+" ") 
            } else {
                process.stdout.write(this.nodeList[i] +"\t\t\t "+this.dist[i]+"\t\t\t"+" ")
                process.stdout.write(" " + this.nodeList[i]+" ")
            }
            let parnode = this.previous[i];
            let count = 0
            while ( parnode != this.source ){
                // console.log(graph.adjencyList[i].vertexRoot)
                count++;
                if(parnode == this.previous[parnode]) {
                }
                else {
                    process.stdout.write(" <--" + this.nodeList[parnode] +" ");
                    parnode = this.previous[parnode];
                }
                // if (count =>3) {
                //     break
                // }
            }
            if (i != this.source) {
                process.stdout.write(' <--'+this.nodeList[this.source])
            }
            console.log('\n');
        }
        console.log ('============================================');
    }

    DFS(v : number){
        let marked : boolean[] = []
        let visit : number[] = []
        let stack : number[] = []
        marked.length = this.previous.length
        for (let i = 0; i < marked.length; i++){
            marked[i] = false
        }
        stack.push(v)
        while (stack.length > 0) {
            v = stack.pop()
            if (marked[v] == false){
                visit.push(v)
                marked[v] = true
                for (let i = 0; i < this.previous.length; i++){
                    if (this.previous[i] == v){
                        stack.push(i)
                    }
                }
            }
        }
        return visit
    }
    BFS(v : number){
        let marked : boolean[] = []
        let visit : number[] = []
        let queue : number[] = []
        marked.length = this.previous.length
        for (let i = 0; i < marked.length; i++){
            marked[i] = false
        }
        queue .push(v)
        while (queue.length > 0) {
            v = queue.shift()
            if (marked[v] == false){
                visit.push(v)
                marked[v] = true
                for (let i = 0; i < this.previous.length; i++){
                    if (this.previous[i] == v){
                        queue.push(i)
                    }
                }
            }
        }
        console.log(visit)
        return visit
    }
    setLevel(){
        let routing :IroutingPacket[] = []
        let sourceRoot = {
            node : this.source,
            levelID: { level: 0, id: 1}
        }
        let v = this.source
        let marked : boolean[] = []
        let visit : number[] = []
        let stack : number[] = []
        marked.length = this.previous.length
        for (let i = 0; i < marked.length; i++){
            marked[i] = false
        }
        stack.push(v)
        let level = 0;
        routing.push(sourceRoot)
        while (stack.length > 0) {
            let index = 0;
            v = stack.pop()
            if (marked[v] == false){
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
                visit.push(v)
                marked[v] = true
                for (let i = 0; i < this.previous.length; i++){
                    if (this.previous[i] == v){
                        stack.push(i)
                    }
                }
            }
            level ++;
        }
        return this.sort_routing(routing,visit);
    }
    sort_routing (routing :IroutingPacket[], visit : number[]){
        let routing_sort :IroutingPacket[] = []
        for (let i = 0; i < routing.length ;i ++) {
            for (let j = 0; j < routing.length; j++) {
                if (visit[i]  == routing[j].node){
                    routing_sort.push(routing[j])
                }
            }
        }
        return routing_sort 
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
