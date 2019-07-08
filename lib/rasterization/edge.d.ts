declare class Edge {
  constructor(
    polygonId: number,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: number,
    windingRule: string
  );
  polygonId: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  color: number;
  windingRule: string;
  intersection: (y: number) => number;
}

export = Edge;
