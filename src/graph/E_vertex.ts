export class Vertex {
    public id: number; 
    public x: number
    public y: number
    public name: string
    public gScore : number|0;
    public fScore : number|0;
    public hScore : number|0;
    public previous : Vertex
    public adjencyVerticesList: Vertex[]| null = null;
    constructor(id?: number, x?: number, y?: number, name? : string) {
      this.id = id;
      this.x = x
      this.y = y
      this.gScore = 0;
      this.fScore = 0;
      this.hScore = 0;
      this.name = name
    }
    addVertexAdjency (vertexList: Vertex[]) {
        this.adjencyVerticesList = vertexList
    }
  }