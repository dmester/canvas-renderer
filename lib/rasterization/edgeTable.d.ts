import Edge from "./edge";

declare class EdgeTable {
  constructor(width: number, height: number);
  clear(): void;
  add(edge: Edge): void;
  sort(): void;
}

export = EdgeTable;