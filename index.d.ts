import Canvas from "./lib/canvas";
declare module index {
    const createCanvas: (width: number, height: number) => Canvas;
}

export = index;
