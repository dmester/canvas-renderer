declare namespace colorUtils {
  const TRANSPARENT: number;
  const FORCE_TRANSPARENT: number;

  const from: (a: number, r: number, g: number, b: number) => number;
  const alpha: (color: number) => number;
  const red: (color: number) => number;
  const green: (color: number) => number;
  const blue: (color: number) => number;
  const parse: (color: string | number) => number;
  const mix: (color1: number, color2: number, weight: number) => number;
  const format: (color: string | number) => string;
  const over: (fore: number, back: number) => number;
  
}

export = colorUtils;
