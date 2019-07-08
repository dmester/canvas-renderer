import Canvas from "../canvas";

declare class BitmapWriter {
  constructor(backColor: number, width: number, height: number);
  canvas: Array<Canvas>;
  write(color: number, count: number): void;
  skip(count: number): void;
}

export = BitmapWriter;
