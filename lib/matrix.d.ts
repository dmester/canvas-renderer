declare class Matrix {
  hasSkewing(): boolean;
  hasTranslation(): boolean;
  hasScaling(): boolean;

  multiply(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): Matrix;
  multiplyPoint(x: number, y: number): { x: number; y: number };
  rotate(angle: number): Matrix;
  translate(x: number, y: number): Matrix;
  scale(x: number, y: number): Matrix;
}

export = Matrix;
