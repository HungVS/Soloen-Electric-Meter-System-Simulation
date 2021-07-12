import {Component} from 'react';
import { Line } from 'react-lineto';
import './App.css';
import {Button, Container,Row, Col, Alert}   from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Node} from './components/node/node'
import {GraphNode} from './components/graphNode/graphNode'
import axios from 'axios';
import { Icoords ,IclientPacket,Iedge,Inode } from './ClientPacket'
import Delayed from './components/delay/delay'

export default class App extends Component <any,any>
{
  public  listNode: Inode[];
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
    this.state = {edges  : [],
                  numberNode : 0,
                  listNodeId : [],
                  listNode : [],
                  solutionPreviousNode: [],
                  connectNode : []
                };
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
  updateGraph = (arrNode : Inode []) => {
    this.resetList()
    for (let i = 0; i < arrNode.length -1 ; i++){
      for (let j = arrNode.length -1; j > i; j--) {
        let dist  = this.dist(arrNode[i].x,arrNode[i].y,arrNode[j].x,arrNode[j].y)
        let edge : Icoords = {
          id1 :arrNode[i].id ,
          x1: arrNode[i].x ,
          y1: arrNode[i].y,
          id2 : arrNode[j].id,
          x2:arrNode[j].x,
          y2:arrNode[j].y,
          distance :dist
        } 
        if(edge.x1 !== undefined && edge.y1 !== undefined && edge.x2 !== undefined && edge.y2 !== undefined) {
          if(this.dist(edge.x1,edge.y1,edge.x2,edge.y2) <= 280){
            this.listEdge.push(edge)
          }
        }
      }
    }

  }
  getAdjencyList( connectNode : Inode[]) {
    let adjentMatrix :IclientPacket [] = []
    for (let i = 0; i < connectNode.length;i++ ) {
      let adjentlist = []
      for (let j = 0; j < this.listEdge.length;j ++) {
        if (connectNode[i].id === this.listEdge[j].id1 ) {
          let edge : Iedge = {vertex_id : this.listNodeId.indexOf(this.listEdge[j].id2), dist : this.listEdge[j].distance}
          adjentlist.push(edge)
        }
        else if (connectNode[i].id === this.listEdge[j].id2) {
          let edge : Iedge =  { vertex_id : this.listNodeId.indexOf(this.listEdge[j].id1), dist : this.listEdge[j].distance}
          adjentlist.push(edge)
        }
      }
      let adj : IclientPacket = {vertexRoot : this.listNodeId.indexOf(connectNode[i].id) ,adjencyVertices : adjentlist}
      adjentMatrix.push(adj)
    }
    return adjentMatrix
  }
  travesal = (v : number) => {
    let marked : boolean[] = []
        let visit : number[] = []
        let queue : number[] = []
        marked.length = this.state.numberNode + 1 
        for (let i = 0; i < marked.length; i++){
            marked[i] = false
        }
        queue.push(v)
        let adjentlist = this.getAdjencyList(this.state.listNode)
        while (queue.length > 0) {
            v = queue.shift()
            if (marked[v] === false){
                visit.push(v)
                marked[v] = true
                try {
                  for (let i = 0; i < adjentlist[v].adjencyVertices.length; i++){
                    const w = adjentlist[v].adjencyVertices[i].vertex_id
                      if ( marked[w] === false){
                          queue.push(w)
                      }
                  }
                }
                catch (e) {

                }
                
            }
        }
        // console.log(visit)
        return visit
  }
  savegraph = () => {
    // this.listEdge = []
    try {
      this.updateGraph(this.listNode)
    const component =  this.travesal (0) 
    let connectNode: Inode[]  = []
    for (let i = 0; i < component.length; i++) {
      let node =  this.listNode[component[i]]
      connectNode.push(node)
    }
    this.updateGraph(connectNode)
    this.setState({ edges: this.listEdge, connectNode : connectNode })
    // console.log(this.listEdge)
    let adjentlist = this.getAdjencyList(connectNode)
    for (let i = 0; i < adjentlist.length;i++) {
      adjentlist[i].vertexRoot = this.state.listNodeId[adjentlist[i].vertexRoot]
      for (let j = 0; j < adjentlist[i].adjencyVertices.length;j++) {
        adjentlist[i].adjencyVertices[j].vertex_id =  this.state.listNodeId[adjentlist[i].adjencyVertices[j].vertex_id]
      }
    }
    // console.log(adjentlist)
    component.sort(function(a, b){return a-b});
    const NodeList : string[] = []
    for (let i = 0; i < component.length ; i ++ ) {
      NodeList.push(this.listNodeId[component[i]])
    }
    axios.post('/api/graph', {
      Adjentlist: adjentlist,
      NodeList: connectNode
    })
    .then( (response) => {
      const tempSolution  = [];
      for(let i = 0; i <Object.keys(response.data.solution).length; i++) {
        tempSolution.push(response.data.solution[i]);
      }
      this.setState({solutionPreviousNode:tempSolution})
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    catch (e) {

    }
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
      // console.log(this.listEdge)
      this.setState({edges: this.listEdge , numberNode : this.state.numberNode -1 ,listNode: this.listNode ,listNodeId: this.listNodeId})
    }
  }
  getnodeById = (id : string) => {
    let node : any
    for (let i = 0; i <this.state.connectNode.length; i++) {
      if (id === this.state.connectNode[i].id) {
        node = this.state.connectNode[i]
      }
    }
    return node
  }
  static renderEdgeList(listEdge:any) {
    return (
          <div className ="line">
          {listEdge.map((listEdge: { x1: number, y1: number; x2: number; y2: number}) =>
             <Delayed waitBeforeShow={100}>
                <Line x0={listEdge.x1 +50} y0={listEdge.y1 +50} x1={listEdge.x2 +50} y1={listEdge.y2 +50} className = 'LineTo' > </Line>
             </Delayed>
            )}
          </div>
   );
  }
  
    render(){
      var indents = [];
      for (let i = 0; i < this.state.numberNode; i++) {
        indents.push(<Node  name = 'ELEC' key={i} onMouseMove= {this.eventhandler}/>);
      }
      var solv = [];   
        
      try {
        for (let i = 0; i < this.state.connectNode.length; i++) {
          let fromNode = this.state.connectNode[i]
          if(this.state.connectNode[i].id !==undefined && this.state.solutionPreviousNode[i] !== undefined && this.state.connectNode[i].id !==  this.state.solutionPreviousNode[i]){
            let toNode = this.getnodeById(this.state.solutionPreviousNode[i])
            console.log(fromNode.id, toNode.id)
            if(this.dist(fromNode.x,fromNode.y,toNode.x,toNode.y) <= 300){
              solv.push(<Delayed waitBeforeShow={2000}>
                <Line x0={fromNode.x +50} y0={fromNode.y +50} x1={toNode.x +50} y1={toNode.y +50} className ='Solution' > 
                </Line>
              </Delayed>)
            }
          }
        }    
      }
      catch (e) {} 
      
    return (
      <div className="App">
        <Container  fluid>
          <Row>
            <Col className="border border-dark border-4" md = {9} style = {{minHeight : 1500, margin :'0 auto'}}>
              <Row className="graph_header">  
                <Col md={5} style={{margin :'0 auto'}}>
                  
                    <Alert variant='secondary'>
                    <Row>
                      <Col ><Button variant = 'primary' onClick = {this.genNode}> Node Generator</Button></Col>
                      <Col ><Button variant = 'danger' onClick = {this.eleminateNode}> Elemination</Button></Col>
                      <Col ><Button variant = 'success' onClick = {this.savegraph}> Save Graph</Button></Col>
                      <h2 style={{marginTop: 10}}>{this.state.numberNode} Electric meters</h2>
                      </Row>
                    </Alert>
                </Col>
              </Row>
              <Row className="graph">
                <Col md = {12}>
                {
                indents
                }
                < Node  name = 'DCU' onMouseMove= {this.eventhandler} x = {900} y = {180}/>
                { 
                App.renderEdgeList(this.state.edges)
                }
                {
                solv
                }
                </Col>
              </Row>
            </Col>
            {/* <Col md = {4} className="border border-dark border-2">
              <Row className ='treeHeader'>
              <Alert variant='secondary' style = {{paddingBottom : 66}}>
              <h2 style={{marginTop: 10}}>Tree</h2>
              </Alert>
              </Row>
              <Row className ='tree'>
                <p></p>
              </Row>
            </Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}
