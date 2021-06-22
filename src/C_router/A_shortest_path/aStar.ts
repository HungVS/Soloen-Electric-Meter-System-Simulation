import {Graph} from '../../graph/Graph'
import {Vertex} from '../../graph/vertex/E_vertex'


export class A_aStrar {
    public openSet: Vertex[]
    public closedSet : Vertex[]
    public path : Vertex[]
    findShortestPath(graph: Graph,start : number, end : number) {
        var tempClosedSet : Vertex [] = []
        var tempPath : Vertex[] = [];
        var  endVertex : Vertex = new Vertex ()
        var tempOpenSet : Vertex [] = []

        for (let i = 0; i < graph.adjencyList.length;i ++){
            if (graph.adjencyList[i].vertexRoot.id == start){
                tempOpenSet.push(graph.adjencyList[i].vertexRoot)
                this.openSet = tempOpenSet
            }
            if (graph.adjencyList[i].vertexRoot.id == end){
                endVertex =  graph.adjencyList[i].vertexRoot
            }
        }
         if (this.openSet.length > 0) {
            while (this.openSet.length > 0 ) {
                //keep going
                //console.log('Open Set Length :'  + this.openSet.length)
                let  lowest = 0;
                for (let i = 0 ; i< this.openSet.length ; i++) {
                    if(this.openSet[i].fScore < this.openSet[lowest].fScore){
                        lowest = i;
                    }
                   // console.log (this.openSet[i])
                }
                let  current = this.openSet[lowest]
                //console.log('current Id : ' + current.id)
                if (current == endVertex){
                    //Find the path
                    var temp = current
                    //tempPath.push(temp)
                    //this.path.push(temp)
                    while (temp.previous)
                    {
                        //this.path.push(temp)
                        tempPath.push(temp)
                        temp = temp.previous
                    }
                    this.path = tempPath
                    console.log( 'DONE !!!')
                    // console.log( ' The path is :')
                    // console.log(this.path)
                    // console.log( '================End Path=============')
                    break;
                }
                this.removeFromArray(this.openSet, current)
                // console.log( 'Open Set------------------------')
                // console.log(this.openSet)
                // console.log( 'End Open Set------------------------')
                tempClosedSet.push(current)
                this.closedSet = tempClosedSet
                // console.log( 'Closed Set------------------------')
                // console.log(this.closedSet)
                // console.log( 'End closed Set------------------------')
                var neighbors = current.adjencyVerticesList
                for (var i = 0; i < neighbors.length; i++) {
                    var neighbor = neighbors[i]
                    if (!this.closedSet.includes(neighbor)){
                        for (let i = 0; i < graph.adjencyList.length;i ++){
                            if (graph.adjencyList[i].vertexRoot.id == current.id){
                                for (let j = 0; j< graph.adjencyList[i].adjencyVertices.length;j++){
                                    if (graph.adjencyList[i].adjencyVertices[j].vertex.id == neighbor.id){
                                       var tempG = current.gScore + graph.adjencyList[i].adjencyVertices[j].weight
                                    }
                                }
                            }
                        }
                        var newPath = false;
                        if (this.openSet.includes(neighbor)){
                            if (tempG < neighbor.gScore){
                                neighbor.gScore = tempG
                                newPath = true;
                            }
                        } else {
                            neighbor.gScore = tempG
                            this.openSet.push(neighbor)
                            newPath = true;
                        }
                        if (newPath){
                            neighbor.hScore = this.heuristics (neighbor,endVertex)
                            neighbor.fScore = neighbor.gScore + neighbor.hScore 
                            neighbor.previous = current
                        }
                    }
                }
            } 
        }
        else {
            //no solution
            console.log('No solution be Found')
            return;
        }
    }

    heuristics ( A_Point : Vertex, B_Point : Vertex){
        var d = this.dist ( A_Point.x,A_Point.y, B_Point.x,B_Point.y)
        return 1
    }
    dist (ax: number,ay: number, bx: number,by: number): number {
        const dist = Math.sqrt (Math.pow(ax-bx,2) + Math.pow(ay-by,2) )
        return dist
    }

    removeFromArray (arr: Vertex[], elt: Vertex) {
        for (let i = arr.length  -1 ; i >=0; i--){
            if (arr[i] == elt){
                arr.splice(i, 1)
            }
        }
    }
    displaySolution() {
        if (this.path.length > 0) {
            console.log('\n')
        console.log('A * Algrorithm ')
        process.stdout.write(' Start vertex :' + this.path[this.path.length-1].previous.id)
        process.stdout.write('>------<')    
        process.stdout.write(' End vertex :' + this.path[0].id)
        console.log('\n')
        console.log( ' The path is :')
        for (let i = this.path.length -1 ; i >= 0  ; i--) {
            if (i == this.path.length-1) {
                process.stdout.write( '||' +  this.path[i].previous.id + "-->" +this.path[i].id+ '-->')
                
            } 
            else if (i > 0 && i < this.path.length-1) {
                process.stdout.write(' ' + this.path[i].id + '-->')
            }
            else {
                process.stdout.write(" " +this.path[0].id+'||')
            } 
        } 
        console.log('\n')
        console.log('F score : ' + this.path[0].fScore) 
        console.log ('============================================');
        console.log('\n')
        } else {
            console.log('Nothing to show')
        }
    }
}