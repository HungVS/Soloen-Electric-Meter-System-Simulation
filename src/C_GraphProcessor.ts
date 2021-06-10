class node<T> {
    public id_node: string |null = null; 
    public next: node<T> | null = null;
    public weight: number  | null = null;
    public prev: node<T> | null = null;
    constructor(public data: T) {

    }
  }