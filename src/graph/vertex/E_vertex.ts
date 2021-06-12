export class Vertex {
    public id: number; 
    public adjencyVerticesList: Vertex[]| null = null;
    constructor(id: number) {
      this.id = id;
    }
    addVertexAdjency (vertexList: Vertex[]) {
        this.adjencyVerticesList = vertexList
    }
  }