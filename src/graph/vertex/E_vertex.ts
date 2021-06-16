export class Vertex {
    public id: number; 
    public fScore : number|0;
    public gScore : number|0;
    public hScore : number|0;
    public adjencyVerticesList: Vertex[]| null = null;
    constructor(id: number) {
      this.id = id;
    }
    addVertexAdjency (vertexList: Vertex[]) {
        this.adjencyVerticesList = vertexList
    }
  }