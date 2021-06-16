import {Graph} from '../Graph'
import {Vertex} from '../vertex/E_vertex'


export class A_aStrar {
    public openSet: number[]
    public closeSet : number[]
    a_star(start : number, end : number ,heuristics: any) {
        this.openSet.push(start)
        if (this.openSet.length > 0 ) {
            //keep going
        }else{
            //no solution
            console.log('No solution be Found')
        }
    }

    heuristics (){


    }
    recontructPath(cameFrom: number, current : number) {

    }
}