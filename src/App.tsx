import {Component} from 'react';
import { Line } from 'react-lineto';
import './App.css';
import {Node} from './components/node/node'
export interface Icoords {
    id1: string
    x1: number
    y1:number
    id2: string
    x2: number
    y2:number
    distance:number
}
export default class App extends Component <any,any>
{
  public  listNode: any[];
  public  listEdge: Icoords[];
  public listNodeId: any[];
  public dist_constraint : 300
  public  status :{
    save : 'SAVE',
    updated : 'UPDATED',
    reset : 'RESET'
  }
  constructor (props :any) {
    super(props);
    this.state = {edges  : [], numberNode : 0,listNodeId : [], listNode : []};
    this.listNode = []
    this.listNodeId = []
    this.listEdge  = []
  }
  eventhandler = data => {

    let  node = {
      id : data.id,
      x : data.x, 
      y : data.y,
      name : data.name
    };
    if(this.listNode.length === 0) {
      this.listNode.push(node)
      this.listNodeId.push(node.id)
      this.setState({ listNode: this.listNode, listNodeId: this.listNodeId })
    }
    else {
      for (let i = 0; i < this.listNode.length; i++){
        if(!this.listNodeId.includes(node.id)) {
           this.listNode.push(node)
           this.listNodeId.push(node.id)
           this.setState({ listNode: this.listNode ,listNodeId: this.listNodeId })
        }
        else {
          let updated = this.listNodeId.indexOf(node.id)
          this.listNode[updated].x = node.x
          this.listNode[updated].y = node.y
        }
      }
    }
  }
  resetList (){
    this.listEdge = []
  }
  dist (ax: number,ay: number, bx: number,by: number): number {
    const dist = Math.sqrt (Math.pow(ax-bx,2) + Math.pow(ay-by,2) )
    return dist
  }
  updateGraph = () => {
    this.resetList()
    for (let i = 0; i < this.listNode.length -1 ; i++){
      for (let j = this.listNode.length -1; j > i; j--) {
        let dist  = this.dist(this.listNode[i].x,this.listNode[i].y,this.listNode[j].x,this.listNode[j].y)
        let edge : Icoords = {
          id1 :this.listNode[i].id ,
          x1: this.listNode[i].x ,
          y1: this.listNode[i].y,
          id2 : this.listNode[j].id,
          x2:this.listNode[j].x,
          y2:this.listNode[j].y,
          distance :dist
        } 
        if(edge.x1 !== undefined && edge.y1 !== undefined && edge.x2 !== undefined && edge.y2 !== undefined) {
          if(this.dist(edge.x1,edge.y1,edge.x2,edge.y2) <= 300){
            this.listEdge.push(edge)
            console.log('i' + i, 'j' + j)
          }
        }
      }
    }
    this.setState({ edges: this.listEdge })
  }
  getAdjencyList() {
    let adjentMatrix = []
    for (let i = 0; i < this.state.listNode.length;i++ ) {
      let adjentlist = []
      for (let j = 0; j < this.listEdge.length;j ++) {
        if (this.state.listNode[i].id === this.listEdge[j].id1 ) {

          adjentlist.push({id : this.listNodeId.indexOf(this.listEdge[j].id2), dist : this.listEdge[j].distance})
        }
        else if (this.state.listNode[i].id === this.listEdge[j].id2) {
          adjentlist.push({id : this.listNodeId.indexOf(this.listEdge[j].id1), dist : this.listEdge[j].distance})
        }
      }
      adjentMatrix.push({vertexRoot : i ,adjencyVertices : adjentlist})
    }
    console.log(adjentMatrix)
    return adjentMatrix
  }
  savegraph = () => {
    // this.listEdge = []
    this.updateGraph()
    console.log(this.state.listNode)
    console.log(this.listEdge)
    console.log(this.listNodeId)
    console.log('========================================')
    this.getAdjencyList()
  }
  componentDidMount() {
    //  this. linedraw(247,400,100,200);
  }
  genNode = () => {
    this.setState({numberNode : this.state.numberNode +1})
  }
  eleminateNode = () => {
    if (this.state.numberNode > 0 ) {
      this.listNode.pop()
      this.listNodeId.pop()
      this.listEdge.pop()
      console.log(this.listEdge)
      this.setState({edges: this.listEdge , numberNode : this.state.numberNode -1 ,listNode: this.listNode ,listNodeId: this.listNodeId})
    }

  }
  static renderEdgeList(listEdge:any) {
    return (
          <div className ="line">
          {listEdge.map((listEdge: { x1: number, y1: number; x2: number; y2: number}) =>
            <Line x0={listEdge.x1 +50} y0={listEdge.y1 +50} x1={listEdge.x2 +50} y1={listEdge.y2 +50}> </Line>
            )}
          </div>
   );
  }
    render(){
      var indents = [];
      for (var i = 0; i < this.state.numberNode; i++) {
        indents.push(<Node  name = 'ELEC' key={i} onMouseMove= {this.eventhandler}/>);
      }
    return (
      <div className="App">
        <div className = 'col-md-3'>
        {
        indents
        }
        < Node  name = 'DCU' onMouseMove= {this.eventhandler} x = {480} y = {70}/>
        { 
        App.renderEdgeList(this.state.edges)
        }
        </div>
        <button onClick = {this.genNode}> Node Generator</button>
        <button onClick = {this.eleminateNode}> Elemination</button>
        <button onClick = {this.savegraph}> Save Graph</button>
        <h2>{this.state.numberNode}</h2>
        <p>Ahihi tesst</p>
      </div>
    );
  }

  linedraw(x1, y1, x2, y2) {
    if (x2 < x1) {
        var tmp;
        tmp = x2 ; x2 = x1 ; x1 = tmp;
        tmp = y2 ; y2 = y1 ; y1 = tmp;
    }

    var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    var m = (y2 - y1) / (x2 - x1);

    var degree = Math.atan(m) * 180 / Math.PI;

    document.body.innerHTML += "<div class='line' style='transform-origin: top left; transform: rotate(" + degree + "deg); width: " + lineLength + "px; height: 1px; background: black; position: absolute; top: " + y1 + "px; left: " + x1 + "px;'></div>";
}
  drawLine(x1, y1, x2, y2){
    let distance = Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2))
    const xMid = (x1 + x2)/2
    const yMid = (y1 + y2)/2
    const salopeRadius = Math.atan2(y1-y2,x1 - x2 )
    const salopeDegree = (salopeRadius*180)/Math.PI
    const top = yMid
    const left = xMid - (distance/2)
    document.body.innerHTML += "<div class='line' style='transform-origin: top left; transform: rotate(" + salopeDegree + "deg); width: " + distance + "px; height: 1px; background: black; position: absolute; top: " + top + "px; left: " + left + "px;'></div>";
  }
}
