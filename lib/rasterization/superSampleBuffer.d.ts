import BitmapWriter from "./bitmapWriter";
declare class SuperSampleBuffer {
  constructor(width: number, samplesPerPixel: number);
  rewind(): void;
  clear(): void;
  writeTo(bitmapWriter: BitmapWriter, count: number): void;
  getColorAt(index: number): number;
  add(color: number, untilX: number): void;
}
