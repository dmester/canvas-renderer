import { createCanvas, Canvas, CanvasContext } from "../../";

// The following code is for testing typings only. It does not produce any sensible output.

const canvas: Canvas = createCanvas(100, 100);
const ctx: CanvasContext = canvas.getContext("2d", {});