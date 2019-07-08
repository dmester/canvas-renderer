declare class Edge {
  polygonId: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  color: number | string;
  windingRule: string;
  intersection: (y: number) => number;
}

export = Edge;