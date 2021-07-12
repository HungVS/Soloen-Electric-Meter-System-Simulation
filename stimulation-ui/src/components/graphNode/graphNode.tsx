import { Component} from 'react';
import nextId from "react-id-generator";
//import { Container } from 'reactstrap';

export class GraphNode extends Component <any,any> {
  static displayName = GraphNode.name;
  htmlId = nextId();
  constructor (props :any) {
    super(props);
    this.state = {
      id : this.htmlId,
      x : this.props.x +1690, 
      y : this.props.y + 142,
      name: this.props.nodeId
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
    return (
        <div id={this.htmlId} className="mydiv" style={{top:142 + this.props.y, left:1690 + this.props.x}} onMouseMove = {this.handleChange}>
       <svg width={100} height={100}>
          <circle cx={50} cy={50} r={40} stroke="green" strokeWidth={4} fill= 'red' />
          <text fill="#ffffff" fontSize={15} fontFamily="Verdana" x={34} y={50}>{this.state.name}</text>
          <text fill="#ffffff" fontSize={15} fontFamily="Verdana" x={34} y={70}> node </text>
        </svg>
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