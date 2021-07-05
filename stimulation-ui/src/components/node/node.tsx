import { Component} from 'react';
import './node.css';
import nextId from "react-id-generator";
//import { Container } from 'reactstrap';

export class Node extends Component <any,any> {
  static displayName = Node.name;
  htmlId = nextId();
  constructor (props :any) {
    super(props);
    this.state = {
      id : this.htmlId,
      x : this.props.x, 
      y : this.props.y ,
      name: this.props.name
    };
  }
  componentDidMount() {
    this.dragElement(document.querySelector(`#${this.htmlId}`));
  }
  componentDidUpdate() {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(this.state);
    }
  }
  render () {
    let color : any 
    let id : any
    if(this.props.name ==='DCU'){
     color = 'red'
     id = ''
    }
    else {
     color = 'blue'
     id = this.htmlId
    }
    return (
    <div id={this.htmlId} className="mydiv" style={{top: this.props.y, left: this.props.x}} onMouseMove = {this.handleChange}>
      <svg width={100} height={100}>
        <circle cx={50} cy={50} r={40} stroke="green" strokeWidth={4} fill= {color} />
        <text fill="#ffffff" fontSize={15} fontFamily="Verdana" x={18} y={60}>{this.props.name} {id} </text>
      </svg>
      {/* <Line x0={this.state.x +50} y0={this.state.y +50} x1={100 +50} y1={200 +50} /> */}
      <span ref = {this.state.x} > x : {this.state.x} y : {this.state.y}</span>
    </div>
      );
  }

  handleChange = e => {this.setState({ [e.target.name]: e.target.value })};

  dragElement(elmnt : any) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e : any) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
       pos3 = e.clientX;
       pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    const elementDrag = (e : any) => {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      // console.log('y'+ elmnt.style.top,'x'+ elmnt.style.left)
      this.setState({ y: (elmnt.offsetTop - pos1), x: (elmnt.offsetLeft - pos2) });
    }
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}