export interface Icoords {
    id1: string
    x1: number
    y1:number
    id2: string
    x2: number
    y2:number
    distance:number
}
export interface IclientPacket {
  vertexRoot : number
  adjencyVertices : Iedge[]
}
export interface Iedge {
  vertex_id: number 
  dist: number
}
export interface Inode {
  id: string 
  x: number
  y: number
  name: string 
}