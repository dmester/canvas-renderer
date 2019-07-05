declare class Crc32 {
  value: number;
  update(buffer: Buffer, bufferStart: number, bufferEnd: number): void;
}

export = Crc32;
