import Edge from "./edge";
declare class LayerManager {
  color: number | string;
  clear(): void;
  copyTo(other: LayerManager): void;
  add(edge: Edge): void;
}

export = LayerManager;
