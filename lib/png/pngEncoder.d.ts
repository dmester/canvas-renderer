import Palette from "./pngPalette";

declare class PngEncoder {
  static GRAYSCALE: number;
  static TRUE_COLOR: number;
  static INDEXED_COLOR: number;
  static GRAYSCALE_WITH_ALPHA: number;
  static TRUE_COLOR_WITH_ALPHA: number;

  writeImageHeader(width: number, height: number, colorType: number): void;
  writeImageGamma(gamma: number): void;
  writeTrueColorWithAlpha(
    colorRanges: Array<number>,
    width: number,
    height: number
  ): void;
  writeIndexed(
    colorRanges: Array<number>,
    palette: Palette,
    width: number,
    height: number
  ): void;
  writePalette(palette: any): void;
  writeTransparency(palette: any): void;
  writeTextualData(key: string, value: string): void;
  writeImageEnd(): void;
  getBuffer(): Buffer;
}

export = PngEncoder;
