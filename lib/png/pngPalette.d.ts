interface Lookup {
  [key: number]: number;
}

declare class PngPalette {
  constructor(colorRanges: Array<number>);
  isValid: boolean;
  hasAlphaChannel: boolean;
  colors: Array<number>;
  lookup: Lookup;
}

export = PngPalette;
