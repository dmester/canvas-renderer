import Edge from "./edge";
declare class LayerManager {
  color: number;
  clear(): void;
  copyTo(other: LayerManager): void;
  add(edge: Edge): void;
}

export = LayerManager;
