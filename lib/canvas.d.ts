import CanvasContext from "./canvasContext";

declare class Canvas {
  constructor(width: number, height: number);
  width: number;
  heigth: number;
  backColor: number | string;
  getContext(): CanvasContext;
  toPng(keywords: object): void;
  toDataURL(): string;
}

export = Canvas;
