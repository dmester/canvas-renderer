declare class BitmapWriter {
  constructor(backColor: number | string, width: number, height: number);
  canvas: [];
  write(color: number | string, count: number): void;
  skip(count: number): void;
}

export = BitmapWriter;
