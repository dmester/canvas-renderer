import BitmapWriter from "./bitmapWriter";
declare class SuperSampleBuffer {
  constructor(width: number, samplesPerPixel: number);
  rewind(): void;
  clear(): void;
  writeTo(bitmapWriter: BitmapWriter, count: number): void;
  getColorAt(index: number): number | string;
  add(color: number | string, untilX: number): void;
}
