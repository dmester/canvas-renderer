declare class PngBuffer {
  writeBuffer(buffer: Buffer, bufferStart: number, bufferEnd: number): void;
  writeString(str: string): void;
  writeInt32BE(value: number): void;
  writeUInt32BE(value: number): void;
  writeInt8(value: number): void;
  writeUInt8(value: number): void;

  startChunk(type: string): void;
  endChunk(): void;
  
  getBuffer(): Buffer;
}

export = PngBuffer;
